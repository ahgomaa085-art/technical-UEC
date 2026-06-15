# UEC Atlas: Technical Management System

Welcome to the **UEC Atlas**, the master technical coordination tool for the UEC university website.

## Project Structure
- **`uec-atlas.html`**: The unified management dashboard (Wireframes, Dictionary, Tasks, History).
- **`data/`**: Technical registry persistence.
  - `task_registry.json`: Master JSON log for collaborative synchronization.
- **`docs/`**: Operational documentation and handoff guides.

## Quick Start
1.  **Launch**: Open `uec-atlas.html` in any modern web browser.
2.  **Import History**: Go to the **Technical Task Log** tab, click **Import Logs**, and select `data/task_registry.json` to load the current project state.
3.  **Collaborate**: Add tasks with mandatory 'Demander' and 'Label' metadata. Export the log periodically to sync with other developers.

## Version Information
- **Current Version**: v2.7 (Isolated Packaging)
- **Engine**: Single-file HTML/JS/CSS with localStorage persistence and JSON sync layer.
