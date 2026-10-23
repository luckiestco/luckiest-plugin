"""Run: python3 -m unittest scripts/test_download.py (from the skill directory)."""
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))
import download  # noqa: E402


def info(language, *keys):
    return {'extractor_key': 'Youtube', 'language': language,
            'automatic_captions': {k: [{'ext': 'vtt'}] for k in keys}}

class SelectCaption(unittest.TestCase):
    def test_several_originals_prefer_english(self):
        for language in ('en', 'bn', None):
            track = download.select_caption(info(language, 'bn-orig', 'en-orig', 'bn', 'en'))
            self.assertEqual(track['key'], 'en-orig', language)

    def test_several_originals_without_english_use_declared_language(self):
        track = download.select_caption(info('hi', 'bn-orig', 'hi-orig', 'bn', 'hi'))
        self.assertEqual(track['key'], 'hi-orig')

    def test_single_original_unchanged(self):
        track = download.select_caption(info(None, 'bn-orig', 'bn', 'en'))
        self.assertEqual((track['key'], track['provenance']), ('bn-orig', 'original'))


if __name__ == '__main__':
    unittest.main()
