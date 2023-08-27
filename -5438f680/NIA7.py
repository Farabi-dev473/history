import yt_dlp

def get_video_transcript(video_url):
    ydl_opts = {
        'skip_download': True,  # Avoid downloading the video
        'writesubtitles': True,  # Write the subtitles to a file
        'subtitleslangs': ['en'],  # Specify the desired language code(s)
        'subtitlesformat': 'srt',  # Choose the subtitle format
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=False)
        video_id = info['id']
        subtitles = info['subtitles']

        if subtitles:
            for lang, subs in subtitles.items():
                if lang == 'en':
                    transcript = subs[0]['data']
                    print(transcript)
                    break
        else:
            print("No subtitles available for the video.")

# Usage example
video_url = 'https://www.youtube.com/watch?v=G0Cp7DrvNLQ&t=16s'
get_video_transcript(video_url)
