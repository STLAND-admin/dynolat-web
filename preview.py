#!/usr/bin/env python3
"""Local static preview, including byte-range support for video seeking."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import re
import threading
import webbrowser
import sys

ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get('PORT', '8766'))

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        self.remaining = None
        path = self.translate_path(self.path)
        if os.path.isfile(path) and self.headers.get('Range'):
            f = open(path, 'rb')
            size = os.fstat(f.fileno()).st_size
            match = re.fullmatch(r'bytes=(\d*)-(\d*)', self.headers['Range'])
            if not match or not any(match.groups()):
                f.close()
                self.send_error(416)
                return None
            left, right = match.groups()
            start = int(left) if left else max(0, size - int(right))
            end = min(int(right), size - 1) if left and right else size - 1
            if start > end or start >= size:
                f.close()
                self.send_response(416)
                self.send_header('Content-Range', f'bytes */{size}')
                self.send_header('Content-Length', '0')
                self.end_headers()
                return None
            self.remaining = end - start + 1
            self.send_response(206)
            self.send_header('Content-Type', self.guess_type(path))
            self.send_header('Content-Length', str(self.remaining))
            self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
            self.send_header('Accept-Ranges', 'bytes')
            self.end_headers()
            f.seek(start)
            return f
        return super().send_head()

    def copyfile(self, source, outputfile):
        try:
            if self.remaining is None:
                return super().copyfile(source, outputfile)
            while self.remaining:
                block = source.read(min(1024 * 1024, self.remaining))
                if not block:
                    break
                outputfile.write(block)
                self.remaining -= len(block)
        except (BrokenPipeError, ConnectionResetError):
            pass

if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', PORT), Handler)
    url = f'http://127.0.0.1:{PORT}/'
    print(f'Preview: {url}', flush=True)
    if '--open' in sys.argv:
        threading.Timer(0.5, lambda: webbrowser.open(url)).start()
    server.serve_forever()
