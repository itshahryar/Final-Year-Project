## SafeSite Plus  
**AI-Powered Construction Safety - Monitoring, Detection, Risk Prevention & Smart Workflows**
<img src="https://github.com/user-attachments/assets/25f14b5d-9ec8-49f6-9727-8e76df8413ee" alt="SAFESITE PLUS Logo" width="100" style="vertical-align:middle; margin-left: 10px;" />

---

## Team Members

- Muhammad Shahryar Amjad  
- Zamin Raza

---

## Table of Contents

- [Problem Statement](#problem-statement)  
- [Solution Overview](#solution-overview)  
- [Project Scope](#project-scope)  
- [Modules](#modules)  
- [Technologies and Tools](#technologies-and-tools)  
- [Development Environments](#development-environments)  
- [Datasets & Annotation Tools](#datasets--annotation-tools)

---

## Problem Statement

On construction sites, safety violations are a significant concern, especially in regions like Pakistan, where many sites lack effective monitoring systems. Supervisors rely on manual observation or CCTV footage, which may fail to catch critical safety issues such as Personal Protective Equipment (PPE) non-compliance and incidents like falls or crowd problems. This leads to delayed responses and increased risk of accidents. Currently, there is a lack of comprehensive data consolidation and predictive tools, which results in reactive safety management and exposes workers to unnecessary risks.

---

## Solution Overview

SafeSite Plus is a real-time construction site safety monitoring system that integrates advanced camera technologies and AI-driven anomaly detection. Using automated incident detection and predictive analytics, the system improves PPE compliance monitoring and detects critical incidents such as falls and crowd issues without relying solely on human observation.

Key features include:  
- Real-time video monitoring and anomaly detection  
- Automated incident logging and reporting  
- AI-driven risk prediction and recommendations  
- Customizable supervisor dashboards  
- Incident escalation and response tracking  

This empowers supervisors to proactively manage multiple sites, minimizing delays in incident response and fostering a safer working environment.

---

## Project Scope

SafeSite Plus is designed to provide construction site supervisors and admins with a robust, user-friendly platform to manage safety efficiently. The scope includes:  
- Multi-device accessible interface  
- Incident reporting and notifications  
- User management with access control  
- Comprehensive reporting and analytics  
- Weather forecasting integration  
- AI assistant chatbot for safety guidance  

---

## Modules

1. **User Administration**  
   - User & profile management  
   - Password recovery  

2. **Site Management & Footage Assessment**  
   - Site registration and supervisor assignment  
   - Reporting & export capabilities  

3. **Supervisor Monitoring Interface**  
   - Live video monitoring & filtering  
   - Customizable anomaly detection parameters  
   - Task management & weather integration  

4. **Video Processing & Frame Display**  
   - Real-time frame processing using YOLOv8  
   - WebSocket-based frame streaming  
   - Automated incident logging  

5. **Dataset Management & Preprocessing**  
   - Data annotation, augmentation, and preprocessing  
   - Unified dataset integration for training  

6. **Safety Anomaly Detection Framework**  
   - PPE compliance detection  
   - Fall and hazard detection  

7. **Incident Management**  
   - Automated logging and prioritized alerts  
   - Response tracking and escalation  

8. **Data Analytics, Suggestions & Forecasting**  
   - Data consolidation & risk prediction  
   - Safety recommendations & weather impact analysis  

9. **Reporting & Visualization**  
   - Automated report generation  
   - Visual data representation  

10. **AI Assistance / Chatbot**  
    - Document chunking & embedding  
    - Semantic search & context-aware response generation  

---

## Technologies and Tools

- **Frontend:** React.js, Material UI, Tailwind CSS  
- **Backend:** Node.js, Express.js, Python  
- **Database:** MongoDB  
- **Real-time Communication:** WebSockets  
- **AI/ML & Computer Vision:**  
  - YOLOv8 (Ultralytics) for object detection  
  - OpenCV for image/video processing  
  - Various AI/ML algorithms  
- **AI Chatbot & NLP:**  
  - OpenAI GPT  
  - Gemini (LLM integration)  
  - LangChain
  - Grok 
- **Additional Tools & APIs:**  
  - Weather Api  
  - DuckDuckGo (for web data retrieval)  

## Development Environments

- Google Colab (for AI model training and experimentation)  
- Visual Studio Code (primary IDE for development)  

## Datasets & Annotation Tools

- Kaggle (source for datasets)  
- Roboflow (dataset management, augmentation, and labeling)  
- LabelImg (image annotation tool)  
- Dataset merging and preprocessing for unified training data  
---
