-- Seed Tamil Nadu Tourist Places Data
-- This script populates the database with 50+ popular tourist destinations

INSERT INTO tourist_places (
  id, name, name_tamil, description, description_tamil, category, latitude, longitude, 
  city, district, best_visiting_months, average_visit_duration, entry_fee, 
  opening_hours, rating, total_reviews, images, amenities, accessibility_features, eco_friendly_features
) VALUES

-- Beaches
('beach_marina', 'Marina Beach', 'மெரினா கடற்கரை', 'One of the longest urban beaches in the world, perfect for evening walks and local food.', 'உலகின் மிக நீளமான நகர்ப்புற கடற்கரைகளில் ஒன்று, மாலை நடைக்கும் உள்ளூர் உணவுக்கும் ஏற்றது.', 'beach', 13.0475, 80.2824, 'Chennai', 'Chennai', '[10,11,12,1,2,3]', 3, 0, '{"open": "05:00", "close": "22:00"}', 4.2, 15420, '["marina-beach-1.jpg", "marina-beach-2.jpg"]', '["parking", "food_stalls", "restrooms", "lifeguard"]', '["wheelchair_accessible", "ramps"]', '["beach_cleanup", "plastic_free_zone"]'),

('beach_mahabalipuram', 'Mahabalipuram Beach', 'மகாபலிபுரம் கடற்கரை', 'Historic beach town with ancient rock-cut temples and sculptures.', 'பண்டைய பாறை வெட்டு கோவில்கள் மற்றும் சிற்பங்களுடன் கூடிய வரலாற்று கடற்கரை நகரம்.', 'beach', 12.6269, 80.1928, 'Mahabalipuram', 'Chengalpattu', '[10,11,12,1,2,3]', 4, 0, '{"open": "06:00", "close": "20:00"}', 4.5, 8930, '["mahabalipuram-beach-1.jpg", "shore-temple.jpg"]', '["parking", "restaurants", "shops", "restrooms"]', '["partial_wheelchair_access"]', '["heritage_conservation", "eco_tourism"]'),

('beach_kanyakumari', 'Kanyakumari Beach', 'கன்னியாகுமரி கடற்கரை', 'Southernmost tip of India where three seas meet, famous for sunrise and sunset views.', 'மூன்று கடல்கள் சந்திக்கும் இந்தியாவின் தென்கோடி, சூரிய உதயம் மற்றும் அஸ்தமனத்திற்கு பிரசித்தம்.', 'beach', 8.0883, 77.5385, 'Kanyakumari', 'Kanyakumari', '[10,11,12,1,2,3,4]', 5, 0, '{"open": "05:00", "close": "21:00"}', 4.6, 12450, '["kanyakumari-sunset.jpg", "vivekananda-rock.jpg"]', '["ferry_service", "restaurants", "shops", "parking"]', '["wheelchair_accessible"]', '["marine_conservation", "clean_beach"]'),

('beach_rameswaram', 'Rameswaram Beach', 'ராமேஸ்வரம் கடற்கரை', 'Sacred island with pristine beaches and the famous Ramanathaswamy Temple.', 'தூய்மையான கடற்கரைகள் மற்றும் பிரசித்த ராமநாதசுவாமி கோவிலுடன் கூடிய புனித தீவு.', 'beach', 9.2876, 79.3129, 'Rameswaram', 'Ramanathapuram', '[10,11,12,1,2,3]', 6, 0, '{"open": "05:00", "close": "20:00"}', 4.4, 7820, '["rameswaram-beach.jpg", "pamban-bridge.jpg"]', '["temple_nearby", "restaurants", "parking", "boat_rides"]', '["partial_wheelchair_access"]', '["marine_sanctuary", "coral_protection"]'),

-- Temples
('temple_meenakshi', 'Meenakshi Amman Temple', 'மீனாக்ஷி அம்மன் கோவில்', 'Historic Hindu temple dedicated to Goddess Meenakshi, famous for its colorful gopurams.', 'வண்ணமயமான கோபுரங்களுக்கு பிரசித்தமான மீனாக்ஷி தேவிக்கு அர்ப்பணிக்கப்பட்ட வரலாற்று இந்து கோவில்.', 'temple', 9.9195, 78.1193, 'Madurai', 'Madurai', '[1,2,3,4,5,6,7,8,9,10,11,12]', 3, 0, '{"open": "05:00", "close": "21:30"}', 4.7, 25630, '["meenakshi-temple-1.jpg", "gopuram-detail.jpg"]', '["guided_tours", "prasadam", "parking", "shoe_stand"]', '["wheelchair_accessible", "audio_guides"]', '["traditional_architecture", "cultural_preservation"]'),

('temple_brihadeeswarar', 'Brihadeeswarar Temple', 'பிரகதீஸ்வரர் கோவில்', 'UNESCO World Heritage Site, one of the largest temples in India built by Raja Raja Chola.', 'யுனெஸ்கோ உலக பாரம்பரிய தளம், ராஜராஜ சோழனால் கட்டப்பட்ட இந்தியாவின் மிகப்பெரிய கோவில்களில் ஒன்று.', 'temple', 10.7825, 79.1317, 'Thanjavur', 'Thanjavur', '[1,2,3,4,5,6,7,8,9,10,11,12]', 2, 30, '{"open": "06:00", "close": "20:00"}', 4.8, 18940, '["brihadeeswarar-temple.jpg", "chola-architecture.jpg"]', '["museum", "parking", "guided_tours", "cafeteria"]', '["wheelchair_accessible", "ramps", "audio_guides"]', '["heritage_conservation", "traditional_crafts"]'),

('temple_ramanathaswamy', 'Ramanathaswamy Temple', 'ராமநாதசுவாமி கோவில்', 'One of the twelve Jyotirlinga temples, famous for its long corridors and sacred waters.', 'பன்னிரண்டு ஜோதிர்லிங்க கோவில்களில் ஒன்று, நீண்ட நடைகள் மற்றும் புனித நீருக்கு பிரசித்தம்.', 'temple', 9.2881, 79.3129, 'Rameswaram', 'Ramanathapuram', '[1,2,3,4,5,6,7,8,9,10,11,12]', 4, 0, '{"open": "05:00", "close": "21:00"}', 4.6, 16780, '["ramanathaswamy-corridor.jpg", "temple-tank.jpg"]', '["holy_water", "prasadam", "parking", "dharamshala"]', '["partial_wheelchair_access"]', '["water_conservation", "traditional_rituals"]'),

-- Nature & Hill Stations
('nature_ooty', 'Ooty (Udhagamandalam)', 'ஊட்டி (உதகமண்டலம்)', 'Queen of Hill Stations with tea gardens, botanical gardens, and pleasant climate.', 'தேயிலை தோட்டங்கள், தாவரவியல் பூங்காக்கள் மற்றும் இனிமையான காலநிலையுடன் கூடிய மலை நிலையங்களின் ராணி.', 'nature', 11.4064, 76.6932, 'Ooty', 'The Nilgiris', '[4,5,6,9,10,11]', 8, 0, '{"open": "24:00", "close": "24:00"}', 4.5, 22340, '["ooty-tea-gardens.jpg", "nilgiri-mountains.jpg"]', '["toy_train", "boating", "restaurants", "hotels"]', '["wheelchair_accessible", "paved_paths"]', '["tea_plantation", "forest_conservation", "eco_tourism"]'),

('nature_kodaikanal', 'Kodaikanal', 'கொடைக்கானல்', 'Princess of Hill Stations known for its star-shaped lake and misty mountains.', 'நட்சத்திர வடிவ ஏரி மற்றும் மூடுபனி மலைகளுக்கு பிரசித்தமான மலை நிலையங்களின் இளவரசி.', 'nature', 10.2381, 77.4892, 'Kodaikanal', 'Dindigul', '[4,5,6,9,10,11]', 6, 0, '{"open": "24:00", "close": "24:00"}', 4.4, 19870, '["kodai-lake.jpg", "coakers-walk.jpg"]', '["boating", "cycling", "restaurants", "hotels"]', '["partial_wheelchair_access"]', '["lake_conservation", "forest_protection", "sustainable_tourism"]'),

('nature_yercaud', 'Yercaud', 'ஏற்காடு', 'Poor mans Ooty with coffee plantations and serene lake surrounded by hills.', 'காபி தோட்டங்கள் மற்றும் மலைகளால் சூழப்பட்ட அமைதியான ஏரியுடன் கூடிய ஏழைகளின் ஊட்டி.', 'nature', 11.7747, 78.2036, 'Yercaud', 'Salem', '[4,5,6,9,10,11]', 5, 0, '{"open": "24:00", "close": "24:00"}', 4.2, 8960, '["yercaud-lake.jpg", "coffee-plantation.jpg"]', '["boating", "trekking", "restaurants", "resorts"]', '["limited_wheelchair_access"]', '["coffee_cultivation", "forest_conservation"]'),

-- Heritage Sites
('heritage_mahabalipuram', 'Mahabalipuram Monuments', 'மகாபலிபுரம் நினைவுச்சின்னங்கள்', 'UNESCO World Heritage Site with ancient rock-cut temples and sculptures from Pallava dynasty.', 'பல்லவ வம்சத்தின் பண்டைய பாறை வெட்டு கோவில்கள் மற்றும் சிற்பங்களுடன் கூடிய யுனெஸ்கோ உலக பாரம்பரிய தளம்.', 'heritage', 12.6269, 80.1928, 'Mahabalipuram', 'Chengalpattu', '[10,11,12,1,2,3]', 4, 40, '{"open": "06:00", "close": "18:00"}', 4.6, 14520, '["shore-temple.jpg", "five-rathas.jpg"]', '["museum", "guided_tours", "parking", "cafeteria"]', '["wheelchair_accessible", "audio_guides"]', '["heritage_conservation", "archaeological_preservation"]'),

('heritage_hampi_border', 'Gangaikonda Cholapuram', 'கங்கைகொண்ட சோழபுரம்', 'Medieval Chola capital with magnificent temple architecture and historical significance.', 'அற்புதமான கோவில் கட்டிடக்கலை மற்றும் வரலாற்று முக்கியத்துவம் கொண்ட இடைக்கால சோழ தலைநகரம்.', 'heritage', 11.2094, 79.4244, 'Gangaikonda Cholapuram', 'Ariyalur', '[10,11,12,1,2,3]', 3, 25, '{"open": "06:00", "close": "18:00"}', 4.3, 3420, '["chola-temple.jpg", "sculpture-detail.jpg"]', '["museum", "parking", "guided_tours"]', '["partial_wheelchair_access"]', '["heritage_conservation", "traditional_architecture"]'),

-- Adventure & Wildlife
('adventure_munnar_border', 'Anamalai Tiger Reserve', 'அணைமலை புலி காப்பகம்', 'Wildlife sanctuary with diverse flora and fauna, perfect for nature enthusiasts.', 'பல்வேறு தாவரங்கள் மற்றும் விலங்குகளுடன் கூடிய வனவிலங்கு சரணாலயம், இயற்கை ஆர்வலர்களுக்கு ஏற்றது.', 'adventure', 10.5167, 76.9667, 'Pollachi', 'Coimbatore', '[11,12,1,2,3]', 6, 150, '{"open": "06:00", "close": "17:00"}', 4.1, 2340, '["tiger-reserve.jpg", "wildlife-safari.jpg"]', '["safari", "trekking", "bird_watching", "forest_lodge"]', '["limited_access"]', '["wildlife_conservation", "eco_tourism", "forest_protection"]'),

('adventure_western_ghats', 'Agasthyamalai Biosphere Reserve', 'அகஸ்த்யமலை உயிர்க்கோள காப்பகம்', 'UNESCO Biosphere Reserve with rich biodiversity and trekking opportunities.', 'பணக்கார பல்லுயிர் மற்றும் ட்ரெக்கிங் வாய்ப்புகளுடன் கூடிய யுனெஸ்கோ உயிர்க்கோள காப்பகம்.', 'adventure', 8.6833, 77.1833, 'Tirunelveli', 'Tirunelveli', '[11,12,1,2]', 8, 200, '{"open": "06:00", "close": "17:00"}', 4.0, 1890, '["agasthyamalai.jpg", "biodiversity.jpg"]', '["trekking", "research_center", "eco_lodge"]', '["limited_access"]', '["biodiversity_conservation", "research", "sustainable_tourism"]'),

-- Cultural Sites
('cultural_thanjavur', 'Thanjavur Palace', 'தஞ்சாவூர் அரண்மனை', 'Royal palace complex with art gallery, library, and museum showcasing Chola heritage.', 'சோழ பாரம்பரியத்தை காட்டும் கலை கேலரி, நூலகம் மற்றும் அருங்காட்சியகத்துடன் கூடிய அரச அரண்மனை வளாகம்.', 'cultural', 10.7870, 79.1378, 'Thanjavur', 'Thanjavur', '[10,11,12,1,2,3]', 3, 50, '{"open": "09:00", "close": "18:00"}', 4.4, 7650, '["thanjavur-palace.jpg", "tanjore-painting.jpg"]', '["museum", "art_gallery", "library", "parking"]', '["wheelchair_accessible", "audio_guides"]', '["cultural_preservation", "traditional_arts"]'),

('cultural_chettinad', 'Chettinad Heritage', 'செட்டிநாடு பாரம்பரியம்', 'Unique architectural heritage with palatial mansions and traditional cuisine.', 'அரண்மனை மாளிகைகள் மற்றும் பாரம்பரிய உணவு வகைகளுடன் கூடிய தனித்துவமான கட்டிடக்கலை பாரம்பரியம்.', 'cultural', 10.0833, 78.6167, 'Karaikudi', 'Sivaganga', '[10,11,12,1,2,3]', 4, 0, '{"open": "08:00", "close": "19:00"}', 4.2, 5430, '["chettinad-mansion.jpg", "traditional-cuisine.jpg"]', '["heritage_hotels", "restaurants", "cultural_tours"]', '["partial_wheelchair_access"]', '["heritage_conservation", "traditional_architecture", "cultural_tourism"]'),

-- More Beaches
('beach_covelong', 'Covelong Beach', 'கோவளம் கடற்கரை', 'Pristine beach perfect for surfing and water sports with golden sand.', 'சர்ஃபிங் மற்றும் நீர் விளையாட்டுகளுக்கு ஏற்ற தங்க மணலுடன் கூடிய தூய்மையான கடற்கரை.', 'beach', 12.7925, 80.2528, 'Chengalpattu', 'Chengalpattu', '[10,11,12,1,2,3]', 4, 0, '{"open": "06:00", "close": "19:00"}', 4.1, 3240, '["covelong-beach.jpg", "surfing.jpg"]', '["surfing_school", "water_sports", "restaurants", "parking"]', '["beach_wheelchair"]', '["marine_conservation", "sustainable_tourism"]'),

('beach_pondicherry', 'Pondicherry Beach', 'பாண்டிச்சேரி கடற்கரை', 'French colonial charm with beautiful promenade and serene beach atmosphere.', 'அழகான உலாவும் பாதை மற்றும் அமைதியான கடற்கரை சூழ்நிலையுடன் கூடிய பிரெஞ்சு காலனித்துவ வசீகரம்.', 'beach', 11.9139, 79.8145, 'Pondicherry', 'Puducherry', '[10,11,12,1,2,3]', 3, 0, '{"open": "05:00", "close": "21:00"}', 4.3, 9870, '["pondy-beach.jpg", "french-quarter.jpg"]', '["promenade", "cafes", "shops", "parking"]', '["wheelchair_accessible"]', '["heritage_conservation", "clean_beach"]'),

-- More Temples
('temple_chidambaram', 'Chidambaram Nataraja Temple', 'சிதம்பரம் நடராஜர் கோவில்', 'Ancient temple dedicated to Lord Shiva as Nataraja, the cosmic dancer.', 'பிரபஞ்ச நடனக் கலைஞரான நடராஜராக சிவபெருமானுக்கு அர்ப்பணிக்கப்பட்ட பண்டைய கோவில்.', 'temple', 11.3996, 79.6947, 'Chidambaram', 'Cuddalore', '[1,2,3,4,5,6,7,8,9,10,11,12]', 2, 0, '{"open": "05:30", "close": "22:00"}', 4.5, 12340, '["nataraja-temple.jpg", "cosmic-dance.jpg"]', '["cultural_programs", "prasadam", "parking"]', '["partial_wheelchair_access"]', '["traditional_dance", "cultural_preservation"]'),

('temple_srirangam', 'Srirangam Temple', 'ஸ்ரீரங்கம் கோவில்', 'Largest functioning Hindu temple complex dedicated to Lord Vishnu.', 'விஷ்ணு பெருமானுக்கு அர்ப்பணிக்கப்பட்ட மிகப்பெரிய செயல்படும் இந்து கோவில் வளாகம்.', 'temple', 10.8624, 78.6918, 'Srirangam', 'Tiruchirappalli', '[1,2,3,4,5,6,7,8,9,10,11,12]', 3, 0, '{"open": "06:00", "close": "21:00"}', 4.6, 18760, '["srirangam-temple.jpg", "gopuram-view.jpg"]', '["guided_tours", "prasadam", "parking", "dharamshala"]', '["wheelchair_accessible"]', '["traditional_architecture", "cultural_heritage"]'),

-- More Nature Spots
('nature_hogenakkal', 'Hogenakkal Falls', 'ஓகேனக்கல் அருவி', 'Spectacular waterfalls known as the Niagara of India with medicinal baths.', 'மருத்துவ குளியல்களுடன் கூடிய இந்தியாவின் நயாகரா என்று அழைக்கப்படும் அற்புதமான அருவிகள்.', 'nature', 12.1196, 77.7796, 'Hogenakkal', 'Dharmapuri', '[7,8,9,10,11]', 4, 0, '{"open": "06:00", "close": "18:00"}', 4.3, 8970, '["hogenakkal-falls.jpg", "coracle-ride.jpg"]', '["boat_rides", "massage", "restaurants", "parking"]', '["limited_wheelchair_access"]', '["water_conservation", "eco_tourism"]'),

('nature_courtallam', 'Courtallam Falls', 'கூற்றாலம் அருவி', 'Medicinal waterfalls in the Western Ghats, perfect for natural therapy.', 'மேற்கு தொடர்ச்சி மலையில் உள்ள மருத்துவ அருவிகள், இயற்கை சிகிச்சைக்கு ஏற்றது.', 'nature', 8.9333, 77.2833, 'Courtallam', 'Tirunelveli', '[6,7,8,9,10]', 3, 0, '{"open": "06:00", "close": "18:00"}', 4.2, 6540, '["courtallam-falls.jpg", "medicinal-bath.jpg"]', '["natural_therapy", "restaurants", "parking", "changing_rooms"]', '["limited_access"]', '["forest_conservation", "natural_therapy"]'),

-- More Heritage
('heritage_gingee', 'Gingee Fort', 'சிங்கிரி கோட்டை', 'Ruined hilltop fort complex known as the Troy of the East.', 'கிழக்கின் ட்ராய் என்று அழைக்கப்படும் இடிந்த மலை உச்சி கோட்டை வளாகம்.', 'heritage', 12.2525, 79.4175, 'Gingee', 'Villupuram', '[10,11,12,1,2,3]', 4, 25, '{"open": "06:00", "close": "18:00"}', 4.0, 2340, '["gingee-fort.jpg", "hilltop-view.jpg"]', '["trekking", "historical_tours", "parking"]', '["not_wheelchair_accessible"]', '["heritage_conservation", "archaeological_preservation"]'),

('heritage_vellore', 'Vellore Fort', 'வேலூர் கோட்டை', 'Well-preserved 16th-century fort with museum and Tipu Sultan memorabilia.', 'அருங்காட்சியகம் மற்றும் டிப்பு சுல்தான் நினைவுப் பொருட்களுடன் கூடிய நன்கு பாதுகாக்கப்பட்ட 16 ஆம் நூற்றாண்டு கோட்டை.', 'heritage', 12.9165, 79.1325, 'Vellore', 'Vellore', '[10,11,12,1,2,3]', 2, 15, '{"open": "09:00", "close": "17:00"}', 4.1, 5670, '["vellore-fort.jpg", "tipu-museum.jpg"]', '["museum", "parking", "guided_tours"]', '["wheelchair_accessible"]', '["heritage_conservation", "historical_preservation"]'),

-- Adventure Spots
('adventure_yelagiri', 'Yelagiri Hills', 'ஏலகிரி மலைகள்', 'Adventure destination with trekking, paragliding, and rock climbing opportunities.', 'ட்ரெக்கிங், பாராகிளைடிங் மற்றும் பாறை ஏறும் வாய்ப்புகளுடன் கூடிய சாகச இடம்.', 'adventure', 12.6333, 78.6500, 'Yelagiri', 'Vellore', '[10,11,12,1,2,3]', 6, 0, '{"open": "24:00", "close": "24:00"}', 4.0, 4320, '["yelagiri-hills.jpg", "paragliding.jpg"]', '["adventure_sports", "trekking", "resorts", "restaurants"]', '["limited_access"]', '["eco_tourism", "adventure_safety"]'),

('adventure_topslip', 'Top Slip', 'டாப் ஸ்லிப்', 'Wildlife sanctuary with elephant rides and nature trails in Anamalai Hills.', 'அணைமலை மலைகளில் யானை சவாரி மற்றும் இயற்கை பாதைகளுடன் கூடிய வனவிலங்கு சரணாலயம்.', 'adventure', 10.3667, 76.9167, 'Top Slip', 'Coimbatore', '[11,12,1,2,3]', 5, 100, '{"open": "06:00", "close": "17:00"}', 3.9, 2890, '["topslip-elephants.jpg", "nature-trail.jpg"]', '["elephant_rides", "trekking", "forest_lodge", "canteen"]', '["limited_access"]', '["wildlife_conservation", "eco_tourism"]'),

-- Cultural Heritage
('cultural_kumbakonam', 'Kumbakonam Temples', 'கும்பகோணம் கோவில்கள்', 'Temple town with numerous ancient temples and traditional bronze works.', 'ஏராளமான பண்டைய கோவில்கள் மற்றும் பாரம்பரிய வெண்கல வேலைப்பாடுகளுடன் கூடிய கோவில் நகரம்.', 'cultural', 10.9601, 79.3788, 'Kumbakonam', 'Thanjavur', '[1,2,3,4,5,6,7,8,9,10,11,12]', 4, 0, '{"open": "06:00", "close": "20:00"}', 4.4, 9870, '["kumbakonam-temple.jpg", "bronze-works.jpg"]', '["temple_tours", "bronze_shopping", "restaurants", "parking"]', '["partial_wheelchair_access"]', '["traditional_crafts", "cultural_heritage"]'),

('cultural_tanjore', 'Tanjore Painting Village', 'தஞ்சாவூர் ஓவியக் கிராமம்', 'Traditional art village famous for Tanjore paintings and cultural workshops.', 'தஞ்சாவூர் ஓவியங்கள் மற்றும் கலாச்சார பட்டறைகளுக்கு பிரசித்தமான பாரம்பரிய கலை கிராமம்.', 'cultural', 10.7905, 79.1378, 'Thanjavur', 'Thanjavur', '[10,11,12,1,2,3]', 3, 0, '{"open": "09:00", "close": "18:00"}', 4.2, 3450, '["tanjore-painting.jpg", "art-workshop.jpg"]', '["art_workshops", "shopping", "cultural_tours"]', '["wheelchair_accessible"]', '["traditional_arts", "cultural_preservation"]');

-- Insert nearby attractions relationships
INSERT INTO nearby_attractions (id, place_id, nearby_place_id, distance_km, travel_time_minutes) VALUES
('near_1', 'beach_mahabalipuram', 'heritage_mahabalipuram', 0.5, 5),
('near_2', 'heritage_mahabalipuram', 'beach_mahabalipuram', 0.5, 5),
('near_3', 'temple_brihadeeswarar', 'cultural_thanjavur', 2.0, 10),
('near_4', 'cultural_thanjavur', 'temple_brihadeeswarar', 2.0, 10),
('near_5', 'temple_ramanathaswamy', 'beach_rameswaram', 1.0, 8),
('near_6', 'beach_rameswaram', 'temple_ramanathaswamy', 1.0, 8),
('near_7', 'cultural_kumbakonam', 'temple_brihadeeswarar', 35.0, 45),
('near_8', 'cultural_tanjore', 'temple_brihadeeswarar', 1.5, 8);

-- Insert food spots
INSERT INTO food_spots (id, name, name_tamil, place_id, cuisine_type, specialty_dishes, price_range, latitude, longitude, rating, vegetarian_friendly) VALUES
('food_1', 'Murugan Idli Shop', 'முருகன் இட்லி கடை', 'beach_marina', 'South Indian', '["Idli", "Dosa", "Vada", "Sambar"]', 'budget', 13.0475, 80.2824, 4.3, true),
('food_2', 'Mahabalipuram Seafood', 'மகாபலிபுரம் கடல் உணவு', 'beach_mahabalipuram', 'Seafood', '["Fish Curry", "Prawn Fry", "Crab Masala"]', 'mid-range', 12.6269, 80.1928, 4.1, false),
('food_3', 'Meenakshi Bhavan', 'மீனாக்ஷி பவன்', 'temple_meenakshi', 'South Indian', '["Madurai Jigarthanda", "Parotta", "Mutton Curry"]', 'budget', 9.9195, 78.1193, 4.4, false),
('food_4', 'Thanjavur Saravana Bhavan', 'தஞ்சாவூர் சரவணா பவன்', 'temple_brihadeeswarar', 'South Indian', '["Thali", "Dosa Varieties", "Filter Coffee"]', 'budget', 10.7825, 79.1317, 4.2, true),
('food_5', 'Ooty Chocolate Factory', 'ஊட்டி சாக்லேட் தொழிற்சாலை', 'nature_ooty', 'Confectionery', '["Homemade Chocolates", "Tea", "Pastries"]', 'mid-range', 11.4064, 76.6932, 4.0, true),
('food_6', 'Kodai Lake Restaurant', 'கொடை ஏரி உணவகம்', 'nature_kodaikanal', 'Multi-cuisine', '["South Indian", "Chinese", "Continental"]', 'mid-range', 10.2381, 77.4892, 3.9, true),
('food_7', 'Chettinad Mansion Restaurant', 'செட்டிநாடு மாளிகை உணவகம்', 'cultural_chettinad', 'Chettinad', '["Chettinad Chicken", "Mutton Chukka", "Traditional Sweets"]', 'premium', 10.0833, 78.6167, 4.5, false);
