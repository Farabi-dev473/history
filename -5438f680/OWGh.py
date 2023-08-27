import yt_dlp

def get_video_transcript(video_url):
    ydl_opts = {
        'skip_download': True,  # Avoid downloading the video
        'writesubtitles': True,  # Write the subtitles to a file
        'subtitleslangs': ['en'],  # Specify the desired language code(s)
        'subtitlesformat': 'srt',  # Choose the subtitle format
        'outtmpl': '%(id)s.%(ext)s',  # Output template for the subtitle file
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=False)
        video_id = info['id']
        ydl.download(['https://www.youtube.com/watch?v=' + video_id])

        # Move the subtitle file to a desired location
        subtitle_file = f"{video_id}.en.srt"
        new_location = "path/to/save/transcript/" + subtitle_file
        os.rename(subtitle_file, new_location)

# Usage example
video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
get_video_transcript(video_url)
