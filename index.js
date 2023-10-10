const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = process.env.YOUR_CLIENT_ID
const CLIENT_SECRET = process.env.YOUR_CLIENT_SECRET
const REDIRECT_URI = process.env.YOUR_REDIRECT_URI
const CALENDAR_ID = process.env.YOUR_CALENDAR_ID

const auth = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

async function createMeetingEvent() {
  try {
    const authUrl = auth.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this URL:', authUrl);

    const authCode = 'YOUR_AUTHORIZATION_CODE'; // Replace with the code obtained after the user signs in

    const { tokens } = await auth.getToken(authCode);
    auth.setCredentials(tokens);

    // Create a new calendar event
    const calendar = google.calendar({ version: 'v3', auth });
    const event = {
      summary: 'Two-Person Meeting',
      description: 'Meeting with two persons',
      start: {
        dateTime: '2023-10-11T10:00:00', // Replace with the start time of the meeting
        timeZone: 'YOUR_TIMEZONE',
      },
      end: {
        dateTime: '2023-10-11T11:00:00', // Replace with the end time of the meeting
        timeZone: 'YOUR_TIMEZONE',
      },
    };

    // Insert the event into the calendar
    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
    });

    console.log('Event created:', response.data);
  } catch (error) {
    console.error('Error creating event:', error);
  }
}

createMeetingEvent();