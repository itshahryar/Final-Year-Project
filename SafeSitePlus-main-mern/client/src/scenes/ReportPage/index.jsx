// import React, { useState } from 'react';
// import ReportSelectionForm from '../../components/ReportSelectionForm';
// import ReportBuilder from '../../components/ReportBuilder';

// const Reports = () => {
//   const [reportData, setReportData] = useState(null);

//   // Dummy data for report
//   const dummyReportData = {
//     month: "May",
//     site: "Site A",
//     time: "Morning",
//     command: "generate-report --site=SiteA --month=May",
//     content: `# **Construction Site Safety & Anomaly Report**
// **Date:** May 1, 2025  
// **Time:** Morning  
// **Site Location:** Site A  
// **Prepared by:** Your Name  

// ---

// ## **1. Executive Summary**  
// All equipment and systems are operational, with safety parameters within acceptable ranges. Two (2) minor anomalies were detected and addressed promptly. No critical incidents reported.  

// **Key Metrics:**  
// - **PPE Compliance Rate:** 98% (2 non-compliance cases corrected).  
// - **Anomalies Detected:** 2 (low risk).  
// - **Temperature Range:** 22°C – 28°C (optimal).  
// - **Safety Thresholds:** 100% within limits.  

// ---

// ## **2. Detailed Findings**

// ### **A. PPE Compliance**
// - **Overall Adherence:** 98% of personnel wore proper PPE (hard hats, high-vis vests, gloves, safety boots).  
// - **Non-Compliance:**  
//   - 1 worker corrected for missing safety goggles.  
//   - 1 worker reminded to fasten harness properly.  
// - **Action Taken:** On-the-spot corrections; no further issues observed.  

// ### **B. Anomaly Detection**
// 1. **Anomaly #1:** Loose scaffolding bracket (Area D).  
//    - **Risk Level:** Low.  
//    - **Resolution:** Tightened immediately; re-inspected.  
// 2. **Anomaly #2:** Exposed wiring near temporary power source (Area A).  
//    - **Risk Level:** Moderate.  
//    - **Resolution:** De-energized and insulated; electrician notified.  

// ### **C. Environmental & Equipment Checks**
// - **Temperature:** Within safe range (no heat stress risks).  
// - **Machinery:** All tools and heavy equipment functional.  
// - **First Aid Kits:** Fully stocked and accessible.  

// ---

// ## **3. Corrective Actions**  
// - Reinforced PPE briefings during toolbox talk.  
// - Scheduled additional scaffolding inspection for May 2.  
// - Reminded team to report hazards via site app immediately.  

// ---

// ## **4. Recommendations**
// 1. Conduct surprise PPE audits next week.  
// 2. Review electrical safety protocols with subcontractors.  
// 3. Document anomalies in centralized log for trend analysis.  

// ---

// ## **5. Conclusion**
// Site conditions remain safe and controlled. All anomalies resolved without downtime. Continued vigilance recommended to maintain 100% compliance.  

// **Next Report Due:** May 8, 2025 (or as scheduled).  

// **Approved by:**  
// [Supervisor’s Name]  
// [Signature/Date]  

// ---

// ### **Notes:**  
// - Customize bold/italic formatting per your company’s style.  
// - Attach photos/logs if anomalies require visual reference.  
// - Use bullet points for brevity and clarity.  
// `
//   };

//   const handleGenerateReport = () => {
//     setReportData(dummyReportData); // Set the dummy report data
//   };

//   return (
//     <div className="container mx-auto py-6">
//       <ReportSelectionForm onGenerate={handleGenerateReport} />
//       {reportData && <ReportBuilder reportData={reportData} />}
//     </div>
//   );
// };

// export default Reports;

// import React, { useState } from 'react';
// import ReportSelectionForm from '../../components/ReportSelectionForm';
// import ReportBuilder from '../../components/ReportBuilder';

// const Reports = () => {
//   const [reportData, setReportData] = useState(null);

//   const handleGenerateReport = (data) => {
//     setReportData(data); // Set the report data received from ReportSelectionForm
//   };

//   return (
//     <div className="container mx-auto py-6">
//       <ReportSelectionForm onGenerate={handleGenerateReport} />
//       {/* {reportData && <ReportBuilder reportData={reportData} />} */}
//       <ReportBuilder reportData={reportData} />
//     </div>
//   );
// };

// export default Reports;

import React from 'react';
import ReportBuilder from '../../components/ReportBuilder';

const Reports = () => {
  return (
    <div className="container mx-auto py-6">
      <ReportBuilder />
    </div>
  );
};

export default Reports;