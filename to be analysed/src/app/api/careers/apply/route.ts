import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import cloudinary from '@/lib/cloudinary';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Extract basic info
        const type = formData.get('type') as string; // ACADEMIC or ADMINISTRATIVE
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const nationalId = formData.get('nationalId') as string;
        const position = formData.get('position') as string;
        const department = formData.get('department') as string;

        // Extract files
        const cvFile = formData.get('cv') as File;
        const photoFile = formData.get('photo') as File;

        // Extract the rest of the data as JSON
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            if (!['type', 'fullName', 'email', 'phone', 'nationalId', 'position', 'department', 'cv', 'photo'].includes(key)) {
                data[key] = value === 'true' ? true : value === 'false' ? false : value;
            }
        });

        let cvUrl = '';
        let photoUrl = '';

        // Helper to upload to Cloudinary
        const uploadToCloudinary = async (file: File, folder: string) => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            return new Promise<string>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: `careers/${folder}`,
                        resource_type: 'auto'
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url || '');
                    }
                );
                uploadStream.end(buffer);
            });
        };

        // Upload files if they exist
        if (cvFile && cvFile.size > 0) {
            cvUrl = await uploadToCloudinary(cvFile, 'cvs');
        }
        if (photoFile && photoFile.size > 0) {
            photoUrl = await uploadToCloudinary(photoFile, 'photos');
        }

        // Save to Database
        const application = await (prisma as any).careerApplication.create({
            data: {
                type,
                fullName,
                email,
                phone,
                nationalId,
                position,
                department,
                data,
                cvUrl,
                photoUrl,
                status: 'PENDING'
            }
        });

        // Send Email Redirection to Rnabil@uec.edu.eg
        if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'placeholder') {
            await resend.emails.send({
                from: 'UEC Careers <careers@uec.edu.eg>',
                to: 'Rnabil@uec.edu.eg',
                subject: `New ${type} Application: ${fullName} (${position})`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #eee; padding: 30px; border-radius: 10px;">
                        <h2 style="color: #0c1c38; border-bottom: 2px solid #c5a358; padding-bottom: 10px;">New Job Application Received</h2>
                        <p><strong>Applicant Name:</strong> ${fullName}</p>
                        <p><strong>Position:</strong> ${position}</p>
                        <p><strong>Department/Faculty:</strong> ${department}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>National ID:</strong> ${nationalId}</p>
                        
                        <div style="margin: 20px 0; padding: 20px; background: #f9f9f9; border-radius: 8px;">
                            <h3 style="margin-top: 0;">Documents:</h3>
                            <p>📄 <strong>CV/Resume:</strong> <a href="${cvUrl}" style="color: #c5a358; font-weight: bold;">Download PDF</a></p>
                            <p>📸 <strong>Professional Photo:</strong> <a href="${photoUrl}" style="color: #c5a358; font-weight: bold;">View Photo</a></p>
                        </div>

                        <h3>Application Data:</h3>
                        <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px; font-size: 13px; overflow-x: auto;">
${JSON.stringify(data, null, 2)}
                        </pre>
                        
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                        <p style="font-size: 12px; color: #999;">This is an automated notification from the UEC Career Portal monitoring system.</p>
                    </div>
                `
            });
        }

        return NextResponse.json({
            success: true,
            id: application.id,
            reference: `UEC-${type.substring(0, 3)}-${application.id.substring(application.id.length - 6).toUpperCase()}`
        });

    } catch (error) {
        console.error('CAREER_APPLICATION_ERROR', error);
        return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
    }
}
