import google.generativeai as genai
genai.configure(api_key="AIzaSyAqc8qTbU1T7tjuIWcOsHv2wtgaDSQRkuc")  # Replace with actual API key
model = genai.GenerativeModel("gemini-1.5-flash")

def predictionUsingLLM(site_data: dict) -> dict:
    
    # """
    # Generate LLM report for a single site
    # Args:
    #     site_data: Dictionary containing site safety data
    # Returns:
    #     Dictionary with formatted LLM report
    # """
    try:
        prompt = f"""You are the SAFESITEPLUS Safety Advisor, an intelligent assistant for analyzing construction site safety data and delivering smart, actionable insights.

You will receive structured JSON data for one or more construction sites. Each site includes: 
- A breakdown of risk factors (PPE, fall, weather, sensitivity, and total risk),
- Weather conditions,
- Basic recommendations.

*Your job is to:*
1. Interpret the risk scores with context.
2. Provide *equipment-specific suggestions* for PPE-related risks.
3. Give *fall-prevention recommendations* when fall risk is non-zero.
4. Suggest *weather-related adjustments* based on temperature, humidity, and storm conditions.
5. Provide *forecast-based strategies* for worsening scenarios.
6. Summarize *current safety concerns*, and categorize overall risk as: Low / Moderate / High.

Your tone should be professional, proactive, and advisory — suitable for supervisors or site safety managers.

Respond for each site using the following format:
Suggesstions you will provide , title should be SafeSitePlus Advisory for siteName get from json data
data I got from scoring and checking weather and previous missings and site severity is {site_data}"""
        


        
        # Call your LLM (Gemini in this case)
        response = model.generate_content(prompt)
        print(response)
        return response.text
        
        # return {
        #     "site_id": site_data["SiteID"],
        #     "site_name": site_data["SiteName"],
        #     "report": response.text,
        #     "metadata": {
        #         "risk_level": site_data["PredictedRiskLevel"],
        #         "generated_at": datetime.now().isoformat()
        #     }
        # }
        
    except Exception as e:
        return {
            "error": str(e),
            "site_data": site_data,
            # "response":response
        }
