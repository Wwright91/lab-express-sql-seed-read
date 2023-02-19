\c songs_dev;

INSERT INTO songs (name, artist, album, time, is_favorite) VALUES
('Caramel', 'Lloyd', 'TRU', '3:23', false),
('Pressure', 'Ari Lennox', 'N/A', '3:13', true),
('Chosen', 'Blxst', 'No Love Lost', '2:41', true),
('Brain', 'Trey Songz', 'N/A', '3:05', true),
('Excited', 'Lloyd', 'TRU', '3:26', false),
('TRU', 'Lloyd', 'TRU', '4:15', false),
('Playboy', 'Trey Songz', 'Tremaine the Album', '4:16', true),
('Come Over', 'Trey Songz', 'Tremaine the Album', '4:01', false);

INSERT INTO albums (album_name, artist_name) VALUES
('TRU', 'Lloyd'),
('No Love Lost', 'Blxst'),
('Tremaine the Album', 'Trey Songz');