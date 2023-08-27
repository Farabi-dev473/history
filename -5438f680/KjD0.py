import subprocess

# Define the YouTube video URL for which you want to get the transcripts
video_url = 'YOUTUBE_VIDEO_URL'  # Replace with the actual YouTube video URL

# Execute yt-dlp command to retrieve video transcripts
command = ['yt-dlp', '--write-auto-sub', '--skip-download', video_url]
result = subprocess.run(command, capture_output=True, text=True)

if result.returncode == 0:
    # Transcripts downloaded successfully
    transcripts = result.stdout
    print(transcripts)
else:
    # Error occurred
    error_message = result.stderr
    print(f'Error occurred while retrieving transcripts: {error_message}')
