
# BlowUp AI - Video Virality Analyzer

## Project Overview

BlowUp AI is a web application that analyzes uploaded videos and provides insights about their viral potential. The application uses AI-powered analysis to give users actionable feedback on how to improve their content for better social media performance.

## Features

- **Video Upload**: Supports various video formats (MP4, MOV, AVI) with drag-and-drop functionality
- **Real-time Analysis**: Processes videos and provides instant feedback
- **Virality Scoring**: Assigns a score based on various factors that influence viral potential
- **Actionable Insights**: Provides specific recommendations for improving content

## Technology Stack

- **Frontend**: React with TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Mock API with simulated analysis (ready for Supabase integration)
- **State Management**: React hooks
- **Styling**: Tailwind CSS with custom gradient utilities

## Core Modules

### Video Upload Component

The video upload component handles:
- File validation (type and size)
- Drag-and-drop interface
- Upload progress tracking
- Error handling with user-friendly messages

### Video Analysis Module

The analysis module:
- Processes uploaded videos (currently simulated)
- Generates a virality score (30-95)
- Provides content-specific insights
- Suggests improvements based on various metrics

### Error Handling

BlowUp AI implements robust error handling throughout the application:

- **Frontend Validation**: Prevents invalid files from being submitted
- **Upload Error Handling**: Detects and displays user-friendly error messages for network issues
- **Analysis Error Recovery**: Allows users to retry failed analyses
- **Comprehensive Logging**: Console logging for debugging purposes

## Supabase Integration

To integrate this project with Supabase:

1. Click on the green Supabase button in the Lovable interface
2. Connect to your Supabase project or create a new one
3. Use Supabase Storage for video uploads
4. Create edge functions for video processing
5. Store analysis results in the Supabase database

## Testing

The mock API includes intentional random failures (10% chance) to test error handling. To run tests:

```bash
npm test
```

This will execute:
- Component tests for the upload interface
- Mock API validation tests
- Error handling tests

## Debugging Common Issues

### Upload Failures

If uploads are failing:
- Check your internet connection
- Verify the file is under 50MB
- Ensure the file is a supported video format

### Analysis Errors

If analysis fails:
- Check for error messages in the console
- Try uploading a different video file
- Verify Supabase connection if using backend storage

## GitHub Integration

This project automatically syncs with GitHub. To use version control effectively:

1. Clone the repository from Lovable
2. Make local changes with your preferred IDE
3. Push changes to automatically update the Lovable project

## Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

For more information on extending this project, refer to the Lovable documentation.
