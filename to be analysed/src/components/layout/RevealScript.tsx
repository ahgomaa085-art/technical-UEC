"use client";

import { useEffect } from "react";

const RevealScript = () => {
    useEffect(() => {
        // Scroll reveal logic from source HTML
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
        );

        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

        // Safety fallback: ensure content appears even if observer fails
        const timeout = setTimeout(() => {
            document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
                el.classList.add("visible");
            });
        }, 2000);

        return () => {
            observer.disconnect();
            clearTimeout(timeout);
        };
    }, []);


    return null;
};

export default RevealScript;
