const { google } = require("googleapis");
const keys = require("ideaportal-rggroup-98d1e32ddb69.json"); // Path to your service account JSON file

const sheets = google.sheets({ version: "v4", auth: new google.auth.GoogleAuth({
   credentials: keys,
   scopes: ["https://www.googleapis.com/auth/spreadsheets"]
}) });

const SPREADSHEET_ID = "14RJKRgFNMp5R8Tz9p-KQpOmKsDj2UhsXrClsHJR2Td0"; // Replace with your spreadsheet ID

async function addIdea(ideaText) {
   const request = {
       spreadsheetId: SPREADSHEET_ID,
       range: "Ideas!A:B", // Adjust range based on your sheet structure
       valueInputOption: "RAW",
       resource: {
           values: [[ideaText]], 
       },
   };

   try {
       await sheets.spreadsheets.values.append(request);
       console.log("Idea added successfully");
   } catch (error) {
       console.error("Error adding idea:", error);
   }
}

async function getUsers() {
   const request = {
       spreadsheetId: SPREADSHEET_ID,
       range: "Users!A:B", // Adjust range based on your sheet structure
   };

   try {
       const response = await sheets.spreadsheets.values.get(request);
       return response.data.values; 
   } catch (error) {
       console.error("Error fetching users:", error);
   }
}

// Export functions for use in other files
module.exports = { addIdea, getUsers };
