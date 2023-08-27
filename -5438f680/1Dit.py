import subprocess

# Define the YouTube video URL for which you want to get the transcripts
video_url = 'https://www.youtube.com/watch?v=G0Cp7DrvNLQ&t=16s'  # Replace with the actual YouTube video URL

# Execute yt-dlp command to retrieve video transcripts
command = ['yt-dlp', '--write-auto-sub', '--skip-download', video_url]
result = subprocess.run(command, capture_output=True, text=True)

if result.returncode == 0:
    # Transcripts downloaded successfully
    transcripts = result.stdout

    # Define the output file name
    output_file = 'transcripts.txt'

    # Write the transcripts to the output file
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(transcripts)

    print(f'Transcripts saved to {output_file} file.')
else:
    # Error occurred
    error_message = result.stderr
    print(f'Error occurred while retrieving transcripts: {error_message}')
