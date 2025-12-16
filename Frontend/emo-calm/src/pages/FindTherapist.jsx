import React, { useState } from "react";

const therapists = [
  {
    "name": "Dr. Rithvik S Kashyap",
    "education": "Clinical Psychologist, RCI Certified",
    "workplace": "Santvana - A Center for Enhancing Psychological Well-being",
    "address": "Agrahara, Near JSS Hospital",
    "city": "Mysore",
    "website": "https://www.psychologyindia.com/therapist/therapist-detail?p_id=MjE3NnwlJCMhfHJpdGh2aWtrYXNoeWFwXzIxNzY%3D",
    "image": "https://images.jdmagicbox.com/comp/mysore/m2/0821px821.x821.191205204120.m1m2/catalogue/dr-mr-rithvik-s-kashyap-saantvana-agrahara-mysore-psychologist-doctors-3ryol9r916-250.jpg",
    "contact_number": "9611314087, 7947141972"
  },
  {
    "name": "Dr. Arti Behl",
    "education": "MBBS, M.D. (Psychiatry) Psychiatrist",
    "workplace": "Individual Therapy Specialist and Apollo BGS Hospital",
    "address": "Apollo BGS Hospital, Adhichunchanagiri Road, Kuvempunagar",
    "city": "Mysore",
    "website": "https://www.practo.com/mysore/doctor/dr-arti-behl-psychiatrist?practice_id=1141625",
    "image": "https://images.apollo247.in/doctors/53c9522a-0c80-4013-bdf8-f2bcaae93d6d-1749739031888.jpg",
    "contact_number": "08046801973, 07947133980"
  },
  {
    "name": "Ms. Anitha Shetty",
    "education": "M.Sc. Clinical & Counselling Psychology – SDM College",
    "workplace": "Prerana Hospital (Psychology team)",
    "address": "A and B Complex, 452, Paduvana Road, Kuvempunagara North, Mysore - 570009",
    "city": "Mysore",
    "website": "https://preranahospitalmysore.com/doctor/anitha-shetty-psychologist",
    "contact_number": "+91 72042 70871",
    "image": "https://cdn.openviowebsites.com/source/sites/7d385d24-0a7d-483c-98bc-048b37e2a270/images/ms.-anitha-shetty-image.jpg"
  },
  {
    "name": "Dr. Nayana Kiran",
    "education": "MS in C&P; MPhil (Learning Disabilities)",
    "workplace": "Santrupti Family & Children Counselling and Health Clinic",
    "address": "8/1, 8/1A Opposite Ranga Rao & Sons, Vanivilasa Road, Mysore - 570004",
    "city": "Mysore",
    "website": "https://www.practo.com/Mysore/doctor/nayana-kiran-ayurveda/474739",
    "contact_number": "+91 99803 32600",
    "image": "https://familycounselingindia.com/wp-content/uploads/2019/08/Dr.-Nayana-Kiran.jpg" 
  },
  {
    "name": "Dr. Deepthi Niranjan",
    "education": "B.A.M.S (Ayurveda) — RGUHS",
    "workplace": "Indus Valley Ayurvedic Centre (IVAC)",
    "address": "Lalitadripura Rd, Chamundi Hill area, Mysuru 570010",
    "city": "Mysore",
    "website": "https://www.ayurindus.com/team/dr-v-s-deepth",
    "contact_number": "+91 94807 84343, +91 80952 94444",
    "image": "https://www.ayurindus.com/wp-content/uploads/2024/09/Dr-Deepthi-Nirnanjan.jpg"
  },
  {
    "name": "Ambara Wellness Clinic",
    "education": "Naturopathy, Yoga Therapy, Functional Medicine",
    "workplace": "The Ambara Wellness Clinic",
    "address": "972, 2nd Stage, Bogadi, Mysore - 570026",
    "city": "Mysore",
    "website": "https://theambara.com",
    "contact_number": "+91 89715 94657",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQFS5Q1JpEkVgw/profile-displayphoto-shrink_200_200/B56ZW47O_8GsAY-/0/1742564291187?e=2147483647&v=beta&t=u_c2syzItCRGaNL9aTXalE-6OBwkZ-eXktDOL9AvQk0"
  },
  {
    "name": "Let's Talk Counselling Center",
    "education": "Qualified Counsellors and Therapists",
    "workplace": "Let's Talk Counselling Center",
    "address": "985, 10th A Cross Rd, Vijayanagar 1st Stage, Mysore - 570017",
    "city": "Mysore",
    "website": "https://sites.google.com/view/lets-talk-counseling",
    "contact_number": "+91 99860 83007",
    "image": "https://lh3.googleusercontent.com/sitesv/AICyYdZBmS3M2ozXz3FAOXVn5O6nJ-6wRRE-0xY_SYnfmH1tzI4NAYUj89JPW8XSfCeEWJ8Mpr-wBVaeS2FFqEk_YsIL0rfLDHxNebA5dl2q538rNT24-C8hOAOBnUoqi3g-t6KP0PLes0zH558F28DSSwXcjn2wbAod77hNMBEdZQorj8em0_0LAdAdjRJmErdIfYhdnta_v0BLm_fd6sVC9lEv9lvzIkKJXSSbW6U=w1280"
  },
  {
    "name": "JSS Hospital Clinical Psychology",
    "education": "M.Sc, M.Phil in Clinical Psychology",
    "workplace": "JSS Hospital",
    "address": "Mahayana Layout, JSS Hospital, Mysore",
    "city": "Mysore",
    "website": "https://jsshospital.in/specialities/clinical-psychology/",
    "contact_number": "+91 63665 30173",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9oiZygnZj_LLciVJ-LL1_EQDVMQWqpNgwUg&s"
  },
  {
    "name": "Arogyam Yoga Therapy",
    "education": "Certified Yoga Therapy Teachers",
    "workplace": "Arogyam, Bharatha Mysore",
    "address": "Mysore (programs at local centers)",
    "city": "Mysore",
    "website": "https://bharatha.org/mysore-yoga-classes/arogyam/",
    "contact_number": "+91 98860 91291",
    "image": "https://bharatha.org/wp-content/uploads/2020/01/logo.png"
  },
  {
    "name": "Swastha Counselling Centre",
    "education": "Counselling Practitioners",
    "workplace": "Swastha Counselling Centre",
    "address": "69, Kuvempunagara North, TK Layout, Mysore - 570009",
    "city": "Mysore",
    "website": "https://bdir.in/p/best/in/counseling-centre-in-mysore-ka/NzMzNDM%3D",
    "contact_number": "See listing",
    "image": "https://via.placeholder.com/400x400?text=Swastha+Counselling"
  },
  {
    "name": "Dr. Nagendra Prasad",
    "education": "MSc - Psychotherapy and Counselling, MBBS",
    "workplace": "Mahalakshmi Clinic",
    "address": "#248, Sarvajanika Hostal Road, Mysore South, Mysuru",
    "city": "Mysuru",
    "website": "https://www.practo.com/mysore/doctor/nagendra-prasad-2-general-physician",
    "contact_number": "08071910737",
    "image": "https://imagesx.practo.com/providers/dr-nagendra-prasad-general-physician-mysore-336e7fce-681e-4238-987d-82c25d96ef8d.jpg?i_type=t_70x70"
  },
  {
    "name": "Dr. Raghunatha Gupta",
    "education": "Psychiatrist, MBBS",
    "workplace": "Private Practice/Clinic",
    "address": "Opp New JSS Hospital, Agrahara, Mysuru",
    "city": "Mysuru",
    "website": "https://jsdl.in/DT-44L9YDFIVHL",
    "contact_number": "07947425550",
    "image": "https://via.placeholder.com/400x400?text=Dr+Raghunatha"
  },
  {
    "name": "Dr. Rajendra",
    "education": "MS - Counselling and Psychotherapy, BAMS",
    "workplace": "Amrutha Ayurvedalaya",
    "address": "Near Agarwal Choultry, Yadavagiri, Mysuru",
    "city": "Mysuru",
    "website": "https://www.practo.com/mysore/doctor/dr-rajendra-ayurveda",
    "contact_number": "07947106737",
    "image": "https://via.placeholder.com/400x400?text=Dr+Rajendra"
  },
  {
    "name": "Dr. Sudharani Naik",
    "education": "Psychiatrist",
    "workplace": "Private Practice/Clinic",
    "address": "Kalidasa Road, Jayalakshmipuram, Mysuru",
    "city": "Mysuru",
    "website": "https://jsdl.in/DT-44FKZCKT67W",
    "contact_number": "08460398459",
    "image": "https://via.placeholder.com/400x400?text=Dr+Sudharani"
  },
  {
    "name": "Dr. Krishna K R",
    "education": "MBBS, M.D. (Psychiatry)",
    "workplace": "Tenderminds Clinic",
    "address": "Kuvempunagar, Mysuru",
    "city": "Mysuru",
    "website": "https://www.practo.com/mysore/doctor/dr-krishna-k-r-psychotherapist",
    "contact_number": "08037298733",
    "image": "https://www.manipalhospitals.com/uploads/doctors_photo/dr-krishna-k-r-consultant-psychiatry.png"
  },
  {
    "name": "Guru Ma Viejna",
    "education": "Reiki & Crystal Grand Master, Pursuing MSW in Counseling",
    "workplace": "Ma Ambika Varahi Healing and Wellness Centre",
    "address": "10th Main, Saraswatipuram, Mysuru",
    "city": "Mysuru",
    "website": "https://maambikavarahiwellnesscenter.com/",
    "contact_number": "9426815672",
    "image": "https://www.maambikavarahiwellnesscenter.com/media/uxmeuug0/whatsapp-image-2024-06-26-at-24400-pm-1.jpeg?width=1080&height=730&quality=70&rnd=133638854114100000"
  },
  {
    "name": "Savikalpa Holistic Center",
    "education": "Hypnotherapy, Reiki Healing",
    "workplace": "Savikalpa Holistic Center",
    "address": "1934, 2nd Cross Rd, Hebbal 2nd Stage, Mysuru, Karnataka 570017",
    "city": "Mysuru",
    "website": "https://savikalpaholisticcenter.com/",
    "contact_number": "+91-6364-79-5551, +91-9538-73-5551",
    "image": "https://i.ytimg.com/vi/mEhEpxGoaqM/maxresdefault.jpg"
  },
  {
    "name": "New Life Counselling And Healing Centre",
    "education": "Counselling & Healing Experts",
    "workplace": "New Life Counselling And Healing Centre",
    "address": "11th A Main Road, Dattagalli, Mysuru",
    "city": "Mysuru",
    "website": "https://jsdl.in/DT-4468X5JK",
    "contact_number": "07947109110",
    "image": "https://via.placeholder.com/400x400?text=New+Life"
  },
  {
    "name": "Nature Healing Center",
    "education": "Health Consultant",
    "workplace": "Nature Healing Center",
    "address": "1st floor, 431, Navilu Rd, Mysuru",
    "city": "Mysuru",
    "website": "https://jsdl.in/DT-44V5APDT5ML",
    "contact_number": "9364016118, 8073013844",
    "image": "https://via.placeholder.com/400x400?text=Nature+Healing"
  },
  {
    "name": "SWASTHI CLINIC - Dr. Chethan Bhat & Dr. Vasudha Rao",
    "education": "MBBS, MD Physician; MBBS, DPM Psychiatrist",
    "workplace": "SWASTHI CLINIC",
    "address": "Kuvempu Nagar Stage 1, Mysuru",
    "city": "Mysuru",
    "website": "https://www.justdial.com/Mysore/Swasthi-Clinic/0821PX821-X821-231117160527-Z1I4_BZDET",
    "contact_number": "7483254234",
    "image": "https://via.placeholder.com/400x400?text=Swasthi+Clinic"
  },
  {
    "name": "INDIA HEALING HOUSE",
    "education": "Meditation Center, Alternative Therapy",
    "workplace": "INDIA HEALING HOUSE",
    "address": "130, 9th Cross Rd, 3rd Stage, Gokulam, Mysuru",
    "city": "Mysuru",
    "website": "https://www.justdial.com/Mysore/India-Healing-House-3rd-Stage-Gokulum-Gokulam/0821PX821-X821-170725181450-T3I8_BZDET",
    "contact_number": "07947118783",
    "image": "https://via.placeholder.com/400x400?text=India+Healing"
  },
  {
    "name": "MYSORE INSTITUTE OF MENTAL HEALTH (MIMH)",
    "education": "Counselor, Rehab Centre",
    "workplace": "MYSORE INSTITUTE OF MENTAL HEALTH",
    "address": "1140, First Floor, Vihara Marga, Siddarthalayout, Mysuru",
    "city": "Mysuru",
    "website": "https://findrehabcentres.com/centre/mysore-institute-of-mental-health-mimh-mysore-karnataka-570011/",
    "contact_number": "07947415713",
    "image": "https://findrehabcentres.com/wp-content/uploads/2024/05/Mysore-Institute-Of-Mental-Health-Mimh-Mysore-Karnataka-1.jpg"
  },
  {
    "name": "YPV Energy Healing Centre Mysore",
    "education": "Yoga Prana Vidya Wellness",
    "workplace": "YPV Energy Healing Centre",
    "address": "82, Madhu Sudhir, 2nd cross, Mysuru",
    "city": "Mysuru",
    "website": "https://www.yogapranavidya.com/",
    "contact_number": "+91 9047359076, +91 93537 28915",
    "image": "https://www.yogapranavidya.com/wp-content/uploads/2023/09/Explore-Shri-NJ-Reddys-Journey-1.jpg"
  },
  {
    "name": "HEALING TOUCH",
    "education": "Physiotherapy and Rehabilitation",
    "workplace": "Healing Touch Physiotherapy and Rehabilitation Center",
    "address": "#1614, Ground Floor, Chamundeshwari Road, Mysuru",
    "city": "Mysuru",
    "website": "https://www.justdial.com/Mysore/Healing-Touch-Physiotherapy-And-Rehabilitation-Center-Near-Vatsalya-Hospital-N-S-Road/0821PX821-X821-130315004516-B4Y4_BZDET",
    "contact_number": "07947110908",
    "image": "https://via.placeholder.com/400x400?text=Healing+Touch"
  },
  {
    "name": "Ms. Shilpi Saraswat",
    "education": "M.Phil (Clinical Psychology), M.Sc (Applied Psychology)",
    "workplace": "Sakra World Hospital",
    "address": "Sakra World Hospital, Bellandur, Bengaluru",
    "city": "Bengaluru",
    "website": "https://www.sakraworldhospital.com/doctors/ms-shilpi-saraswat-clinical-psychology",
    "contact_number": "+91 80 4969 4969",
    "image": "https://www.sakraworldhospital.com/assets/doctor-images/767x863-shilpi-saraswat.webp"
  },
  {
    "name": "Ms. Aparna Rani",
    "education": "M.Phil (Clinical Psychology) — RCI licensed",
    "workplace": "Cadabam's Hospitals",
    "address": "J P Nagar, Bengaluru",
    "city": "Bengaluru",
    "website": "https://www.cadabamshospitals.com/doctor/aparna-rani/",
    "contact_number": "+91 97414 76476",
    "image": "https://cdn-hkbbb.nitrocdn.com/QTCJbUazKnWUNTVqagKZShXFbBtZByZg/assets/images/optimized/rev-2937d83/www.cadabamshospitals.com/wp-content/uploads/2025/05/Aparna-Rani.jpg"
  },
  {
    "name": "Ms. Ayushi Jain",
    "education": "M.Phil (Clinical Psychology) — NIMHANS alumna",
    "workplace": "Cadabam's Hospitals",
    "address": "J.P. Nagar, Bengaluru",
    "city": "Bengaluru",
    "website": "https://www.cadabamshospitals.com/doctor/ayushi-jain/",
    "contact_number": "+91 97414 76476",
    "image": "https://cdn-hkbbb.nitrocdn.com/QTCJbUazKnWUNTVqagKZShXFbBtZByZg/assets/images/optimized/rev-2937d83/www.cadabamshospitals.com/wp-content/uploads/2025/05/Ayushi-Jain.jpg"
  },
  {
    "name": "Dr. Archana R",
    "education": "M.Phil Clinical Psychology — NIMHANS",
    "workplace": "Samvaad Neuropsychiatry Centre",
    "address": "#1561, East End Main Road, Jayanagar 9th Block, Bengaluru - 560069",
    "city": "Bengaluru",
    "website": "https://www.samvaadneuropsychiatrycentre.in/dr-archana-r/",
    "contact_number": "+91-91089 27293, 080-35547674",
    "image": "https://tse3.mm.bing.net/th/id/OIP.JQ2XfEOtjNG6lz4Yz1JOcwHaGA?rs=1&pid=ImgDetMain"
  },
  {
    "name": "Vinay Siddaiah",
    "education": "Certified Yoga Therapist (AYUSH)",
    "workplace": "YogaVijnana",
    "address": "Bengaluru",
    "city": "Bengaluru",
    "website": "https://www.yogavijnana.in/yoga-therapy",
    "contact_number": "Contact via YogaVijnana",
    "image": "https://static.wixstatic.com/media/85b4ce_ef02bec5e8554e7fb15d6f0f16df6cb6~mv2.jpg/v1/fill/w_299,h_449,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/DSC_0359_edited.jpg"
  },
  {
    "name": "Dr. Madhushree H S",
    "education": "Ayurvedic physician / Panchakarma specialist",
    "workplace": "Sri Sri Ayurveda Hospital",
    "address": "Sri Sri Ayurveda Hospital, Bengaluru",
    "city": "Bengaluru",
    "website": "https://srisriayurvedahospital.org/panchakarma/",
    "contact_number": "Contact via hospital",
    "image": "https://srisriayurvedahospital.org/wp-content/uploads/2024/11/dr-madhushree.jpg"
  },
  {
    "name": "Ms. Jini K Gopinath",
    "education": "Senior Clinical Psychologist",
    "workplace": "Mibo Care",
    "address": "Mibo Care, Bengaluru",
    "city": "Bengaluru",
    "website": "https://mibocare.in/bengaluru/senior-clinical-psychologist-jini-k-gopinath/",
    "contact_number": "Contact via MiboCare",
    "image": "https://mibocare.in/wp-content/uploads/2024/03/Dr.-Jini-K-Gopinath-768x709.png"
  },
  {
    "name": "Ms. Teena Choudhary",
    "education": "Certified yoga / prenatal yoga trainer",
    "workplace": "Independent yoga therapy (Wellintra)",
    "address": "Hebbal, Bengaluru",
    "city": "Bengaluru",
    "website": "https://www.wellintra.com/trainers/teena-choudhary/",
    "contact_number": "Contact via Wellintra",
    "image": "https://www.wellintra.com/wp-content/uploads/2022/07/female-yoga-instructor-hebbal-bangalore.jpg"
  },
  {
    "name": "Ms. Richa Mehrotra",
    "education": "Counsellor / Psychologist",
    "workplace": "Practo listing (Indiranagar)",
    "address": "Indiranagar, Bengaluru",
    "city": "Bengaluru",
    "website": "https://www.practo.com/bangalore/therapist/richa-mehrotra-psychologist",
    "contact_number": "Practo profile",
    "image": "https://www.docgenie.in/assets/images/doctorspic/richaMehrotraMs.jpg"
  },
  {
    "name": "Ms. Maneena James",
    "education": "Clinical/Counselling Therapist",
    "workplace": "Mindful TMS Neurocare",
    "address": "Whitefield, Bengaluru",
    "city": "Bengaluru",
    "website": "https://www.practo.com/bangalore/therapist/maneena-james-psychologist",
    "contact_number": "+912248968124",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRllDRO0i8JX1xZBiRgftNdpl1GqCurwF5ocA&s"
  },
  {
    "name": "Mibo The Mind Expert",
    "education": "Team of Clinical Psychologists & Psychiatrists (Ph.D., M.Phil, MD)",
    "workplace": "Mibo The Mind Expert",
    "address": "22, 32nd E Cross Rd, Jayanagar, Bengaluru, Karnataka 560041",
    "city": "Bengaluru",
    "website": "https://mibocare.in/bengaluru/",
    "image": "https://mibocare.in/wp-content/uploads/2023/07/Mibo-Logo-PNG.png",
    "contact_number": "+91 79960 04444"
  },
  {
    "name": "Heart It Out",
    "education": "Team of Mental Health Professionals",
    "workplace": "Heart It Out",
    "address": "#42, 7th B Cross Rd, Koramangala, Bengaluru, Karnataka 560034",
    "city": "Bengaluru",
    "website": "https://heartitout.in/",
    "image": "https://res.cloudinary.com/dywkbcfp5/image/upload/w_200,h_200,bo_2px_solid_white,f_webp/v1597658192/urgzoppcgevb3axyjlld.png",
    "contact_number": "+91 78925 51372"
  },
  {
    "name": "Dr. Jayaprada Suresh",
    "education": "Doctorate in Psychology, MS - Counselling and Psychotherapy",
    "workplace": "Dr. Jayaprada's Psychology Clinic",
    "address": "1st Floor, 369, 16th Main, Jayanagar, Bengaluru, Karnataka 560041",
    "city": "Bengaluru",
    "website": "https://drjayapradasuresh.com/",
    "image": "https://drjayapradasuresh.com/wp-content/uploads/sites/117/2025/04/Mom-1024x768.jpg",
    "contact_number": "+91 80 6945 9054"
  },
  {
    "name": "Suma N",
    "education": "M.Phil (Clinical Psychology) - Gold Medallist, MSc Psychology",
    "workplace": "Samvaad Neuropsychiatry Centre",
    "address": "1561, E End Main Rd, Jayanagar, Bengaluru, Karnataka 560041",
    "city": "Bengaluru",
    "website": "https://www.samvaadneuropsychiatrycentre.in/dr-suma-n/",
    "image": "https://www.samvaadneuropsychiatrycentre.in/wp-content/uploads/2023/01/Dr-Suma-N-785x1024.jpg",
    "contact_number": "+91 82473 10389"
  },
  {
    "name": "Chaitra Mahesh",
    "education": "M.Sc in Psychological Counselling, Diploma in Counselling Skills",
    "workplace": "Untangle - Counseling & Psychotherapy",
    "address": "L21, 7th Cross Rd, Jayanagar, Bengaluru, Karnataka 560078",
    "city": "Bengaluru",
    "website": "https://untangle.co.in/chaitra-mahesh/",
    "image": "https://untangle.co.in/wp-content/uploads/2023/04/Chaitra.webp",
    "contact_number": "+91 96068 10606"
  },
  {
    "name": "Dr. Divya Kumawat",
    "education": "Ph.D in Psychology, Masters in Applied Psychology",
    "workplace": "Kalpari Art and Mind",
    "address": "Electronic City Phase I, Bengaluru, Karnataka 560100",
    "city": "Bengaluru",
    "website": "https://www.kalpariartandmind.com/dr-divya-kumawat.html",
    "image": "https://www.kalpariartandmind.com/uploads/1/3/1/6/13167905/editor/7.jpeg?1688569051",
    "contact_number": "+91 99002 08056"
  },
  {
    "name": "Neha Kamboj",
    "education": "Internationally certified Theta Healer, Reiki, EFT, Sound Healing",
    "workplace": "Angels Miracle - Holistic Healing Centre",
    "address": "12, 20th K Cross Rd, Ejipura, Bengaluru, Karnataka 560047",
    "city": "Bengaluru",
    "website": "https://www.angelsmiracle.com/",
    "image": "https://angelsmiracle.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2024-07-18-at-21.02.51-e1731387138271-raoeuvepq21otmxprruvsvlkb06wf2xc4n7kz2jde0.webp",
    "contact_number": "+91 88618 56134"
  },
  {
    "name": "Dr. Lathashekhar",
    "education": "Yoganidhi, Holistic Wellness Practitioner",
    "workplace": "Dr Lathashekhar Holistic Wellness Center",
    "address": "Banashankari, Bengaluru, Karnataka 560085",
    "city": "Bengaluru",
    "website": "https://www.drlathashekhar.com/",
    "image": "https://www.drlathashekhar.com/images/latha-profile.jpg",
    "contact_number": "+91 95356 60110"
  },
  {
    "name": "Nisarga Holistic Health Centre",
    "education": "Team of BNYS, BAMS, BPT Doctors",
    "workplace": "Nisarga Holistic Health Centre",
    "address": "Whitefield, Bengaluru, Karnataka 560066",
    "city": "Bengaluru",
    "website": "http://www.nisargaholistichealth.com/",
    "image": "https://nisargaholistichealth.com/wp-content/uploads/2025/08/About-Us-Page-682x1024.jpg",
    "contact_number": "+91 99028 27767"
  },
  {
    "name": "T S Chandrika",
    "education": "MSc (Counselling Psychology)",
    "workplace": "Tiger's Counselling Centre",
    "address": "Koramangala, Bengaluru, Karnataka 560034",
    "city": "Bengaluru",
    "website": "https://www.tigerscounselling.com/",
    "image": "https://static.wixstatic.com/media/295786_f2634d2b74fc438692f33d6782e78afd~mv2.jpg/v1/fill/w_425,h_292,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/FB_IMG_1708065744073_edited.jpg",
    "contact_number": "+91 96060 76843"
  },
  {
    "name": "Dr. Padmanabha Shettigara",
    "education": "Acupuncturist, Yoga and Naturopathy",
    "workplace": "Sthira Holistic Health Centre",
    "address": "Vajarahalli, Bengaluru, Karnataka 560109",
    "city": "Bengaluru",
    "website": "https://www.sthirahhc.com/",
    "image": "https://sthirahhc.com/wp-content/uploads/2025/05/dr-padmanabha-shettigar-304x405.jpeg",
    "contact_number": "+91 77604 38586"
  },
  {
    "name": "Dr. Ameeta Thacker",
    "education": "Licensed Trainer in Integrated Clinical Hypnotherapy",
    "workplace": "Wholistic Wellness",
    "address": "Andheri East, Mumbai",
    "city": "Mumbai",
    "website": "https://wholisticwellness.in/",
    "image": "https://wholisticwellness.in/assets/images/about/dr-ameeta-image.webp",
    "contact_number": "+91-9820-249-177"
  },
  {
    "name": "Dr. Kedar Tilwe",
    "education": "MD (Psychiatry), DPM, MBBS",
    "workplace": "Fortis Hospital Mulund",
    "address": "Mulund West, Mumbai",
    "city": "Mumbai",
    "website": "https://www.fortishealthcare.com/",
    "image": "https://www.fortishealthcare.com/drupal-data/doctors/dr-kedar-tilwe-601.jpg",
    "contact_number": "07947118360"
  },
  {
    "name": "Holistic Mind Clinic",
    "education": "MBBS, MS, MBA, PG Diploma in Mental Health",
    "workplace": "Holistic Mind Clinic",
    "address": "India – online & face-to-face sessions",
    "city": "India",
    "website": "https://holisticmindclinic.com/",
    "image": "https://holisticmindclinic.com/assets/images/doctor/DSC_2479%20copy.jpg",
    "contact_number": "+91-93924-49896"
  },
  {
    "name": "Dr. Priyanka Thukral Mahajan",
    "education": "PhD - Psychology, M.Phil - Clinical Psychology",
    "workplace": "Masina Hospital & Mind Wellness Clinic",
    "address": "Dadar(W), Mumbai-400028",
    "city": "Mumbai",
    "website": "https://drpriyankamahajan.com/",
    "image": "https://drpriyankamahajan.com/wp-content/uploads/2024/05/Dr-PriyankaPng1.png",
    "contact_number": "+91-9136936544"
  },
  {
    "name": "Dr. Nahid Dave",
    "education": "MD (Psychiatry), DPM, MBBS",
    "workplace": "Insight Mind Care",
    "address": "Dadar West, Mumbai 400028",
    "city": "Mumbai",
    "website": "https://www.thoughtmatters.info/",
    "image": "https://static.wixstatic.com/media/263c38_42beb7b3d8564fc0a6b39c8547e61edc~mv2_d_1824_2085_s_2.jpg/v1/crop/x_0,y_288,w_1824,h_1046/fill/w_860,h_493,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_20191008_132855__01__01.jpg",
    "contact_number": "+91 97732 40994"
  },
  {
    "name": "The Alternative Story",
    "education": "Team of Psychologists & Therapists",
    "workplace": "The Alternative Story",
    "address": "Juhu, Mumbai",
    "city": "Mumbai",
    "website": "https://alternativestory.in/",
    "image": "https://i0.wp.com/alternativestory.in/wp-content/uploads/2019/01/cropped-CR-Offsite-Oct2018-3-1-scaled.jpg?fit=768%2C766&ssl=1",
    "contact_number": "+91 8062178642"
  },
  {
    "name": "Mpower – The Centre",
    "education": "Counsellors, psychologists & therapists team",
    "workplace": "Mpower The Centre Mumbai",
    "address": "Hughes Road, Mumbai - 400007",
    "city": "Mumbai",
    "website": "https://mpowerminds.com/",
    "image": "https://mpowerminds.com/assets/img/root/Mpower%20Logo-04.svg",
    "contact_number": "+91 97 02800044"
  },
  {
    "name": "Mindsight Clinic",
    "education": "Team including Clinical Psychologists, Psychiatrists",
    "workplace": "Mindsight Clinic",
    "address": "Malad West, Mumbai, Maharashtra 400064",
    "city": "Mumbai",
    "website": "https://mindsightclinic.com/",
    "image": "https://mindsightclinic.com/wp-content/uploads/2020/06/Dr-Shefali-Batra.jpg",
    "contact_number": "+91 - 7219222199"
  },
  {
    "name": "Dr. Naazneen Ladak",
    "education": "MBBS, DPM (Psychiatry), Psychiatrist",
    "workplace": "BHN Mind Tree Clinic",
    "address": "Lokhandwala, Andheri West, Mumbai",
    "city": "Mumbai",
    "website": "https://www.practo.com/mumbai/therapist/dr-nazneen-psychiatrist-1",
    "image": "https://imagesx.practo.com/providers/dr-naazneen-ladak-psychiatrist-mumbai-02e23ff6-8f26-4ff3-91e7-4f774d311596.jpg?i_type=t_70x70",
    "contact_number": "02048553587 Ext. 217"
  },
  {
    "name": "Dr. Riddhi Sagar",
    "education": "MA - Psychology, Therapist, Counselling Psychologist",
    "workplace": "Riddhi Sagar's Clinic",
    "address": "Prime Mall, Mumbai",
    "city": "Mumbai",
    "website": "https://www.practo.com/mumbai/therapist/ridhhi-sagar-psychologist",
    "image": "https://imagesx.practo.com/providers/ms-riddhi-sagar-counselling-psychologist-mumbai-742e8be5-d523-494c-a656-aa419af30314.jpg?i_type=t_70x70",
    "contact_number": "918037298995"
  },
  {
    "name": "WayForward - Mental Health Practitioners",
    "education": "Team of Psychologists (MA, M.Sc, M.Phil)",
    "workplace": "WayForward",
    "address": "Andheri East, Mumbai",
    "city": "Mumbai",
    "website": "https://wayforward.io/",
    "image": "https://wayforward.io/wp-content/uploads/2022/02/IMG_1018-scaled-e1644917520448-1024x1024.jpg",
    "contact_number": "+91 22 4972 5440"
  },
  {
    "name": "Sukoon Health",
    "education": "Multidisciplinary Team: Psychiatrists, Clinical Psychologists",
    "workplace": "Sukoon Health",
    "address": "Andheri West, Mumbai",
    "city": "Mumbai",
    "website": "https://sukoonhealth.com/",
    "image": "https://sukoonhealth.com/static/sukoon-header-logo-48fea45d769b96110ed1d949f97caa5a.svg",
    "contact_number": "+91 91 8448156500"
  },
  {
    "name": "The Integral Space",
    "education": "Multidisciplinary wellbeing team",
    "workplace": "The Integral Space",
    "address": "Lower Parel – 400013",
    "city": "Mumbai",
    "website": "https://www.theintegralspace.com/",
    "image": "https://static.wixstatic.com/media/9effb1_bee10b5cc41742a0897e457e67c40116~mv2.png/v1/crop/x_0,y_264,w_3024,h_3022/fill/w_344,h_344,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_4125_heic.png",
    "contact_number": "+91 98203 46338"
  },
  {
    "name": "Cesta Holistic Healing Studio",
    "education": "Theta Healing® certification",
    "workplace": "Cesta Holistic Healing Studio",
    "address": "Mumbai",
    "city": "Mumbai",
    "website": "https://www.cestahealingstudio.com/",
    "image": "https://static.wixstatic.com/media/f6a3c6_aa12ea070736414099cf4fa5297765a0~mv2.jpg/v1/fill/w_596,h_725,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f6a3c6_aa12ea070736414099cf4fa5297765a0~mv2.jpg",
    "contact_number": "+91 98192 32223"
  },
  {
    "name": "Adhivel Spiritual Healing",
    "education": "Holistic Soul Therapy",
    "workplace": "Adhivel Spiritual Healing Centre",
    "address": "Pallikaranai, Chennai - 600100",
    "city": "Chennai",
    "website": "https://www.adhivel.com/",
    "image": "https://static.wixstatic.com/media/312210_c07c7e099b8a47daa048ad53e0aed212~mv2.jpg/v1/fill/w_393,h_475,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/312210_c07c7e099b8a47daa048ad53e0aed212~mv2.jpg",
    "contact_number": "+91 78688 82030"
  },
  {
    "name": "Antharikksha Holistic Wellness",
    "education": "MS Counselling & Psychotherapy, BAMS/MD Ayurveda",
    "workplace": "Antharikksha Holistic Wellness",
    "address": "Alwarthirunagar, Chennai",
    "city": "Chennai",
    "website": "https://www.practo.com/chennai/clinic/antharikksha-holistic-wellness-for-body-and-mind-alwarthirunagar-1",
    "image": "https://images1-fabric.practo.com/practices/1271596/antharikksha-holistic-wellness-for-body-and-mind-chennai-5de9e41957212.png",
    "contact_number": "04446271587 Ext. 727"
  },
  {
    "name": "Satvat Holistics",
    "education": "Sound healing & emotional counselling team",
    "workplace": "Satvat Holistics, Dhwani Sound Therapy Studio",
    "address": "Adyar, Chennai-20",
    "city": "Chennai",
    "website": "https://www.satvatholistics.com/",
    "image": "https://www.satvatholistics.com/assets/images/about/mrs-sunithi-founder.webp",
    "contact_number": "+91 8056005484"
  },
  {
    "name": "Anbu Healing Therapy",
    "education": "Chinese Acupuncture, Sujok, Varmam, Yoga",
    "workplace": "ANBU Healing Therapy",
    "address": "Kottivakkam, Chennai - 600041",
    "city": "Chennai",
    "website": "https://www.anbuhealing.com/",
    "image": "https://www.anbuhealing.com/wp-content/uploads/2020/06/cropped-ANBU_logoJPEG.jpg",
    "contact_number": "+91 98847 16009"
  },
  {
    "name": "Aayushmaan Holistic Health Centre",
    "education": "Siddha & Natural Treatments team",
    "workplace": "Aayushmaan Holistic Health Centre",
    "address": "Kundrathur, Chennai",
    "city": "Chennai",
    "website": "https://livefulllife.org/",
    "image": "https://livefulllife.org/wp-content/uploads/2024/06/AAyushamaan_Logo-removebg-preview-2-edited.png",
    "contact_number": "044-48675599"
  },
  {
    "name": "Holistic Healing Centre",
    "education": "Reiki, Energy Healing, Sujok, Reflexology",
    "workplace": "Holistic Healing Centre – Chennai",
    "address": "Chennai, India",
    "city": "Chennai",
    "website": "https://ancientauras.com/",
    "image": "https://ancientauras.com/wp-content/uploads/2021/08/site-logo.svg",
    "contact_number": "+91-98413-34549"
  },
  {
    "name": "Reiki Centre of India",
    "education": "Reiki & Acupuncture healing practitioners",
    "workplace": "Reiki Centre of India",
    "address": "Thiruvanmiyur, Chennai 600041",
    "city": "Chennai",
    "website": "https://reikicentreofindia.org/reachus.htm",
    "image": "https://reikicentreofindia.org/image/reiki_banner.jpg",
    "contact_number": "+91-98413-34549"
  },
  {
    "name": "Mahashakthi Treatment Centre",
    "education": "Subconscious mind therapy",
    "workplace": "Mahashakthi Treatment Centre",
    "address": "West Mambalam, Chennai – 600033",
    "city": "Chennai",
    "website": "https://www.mahashaktitreatmentcentre.com/",
    "image": "https://static.wixstatic.com/media/b27391_c9a03e2890ff48ad8bef1503f62effd5~mv2.png/v1/fill/w_241,h_224,al_c,q_85,enc_avif,quality_auto/b27391_c9a03e2890ff48ad8bef1503f62effd5~mv2.png",
    "contact_number": "+91-93443-86145"
  },
  {
    "name": "Cansaa Holistic Healing Centre",
    "education": "Ayurveda, Acupuncture, Sound Healing",
    "workplace": "Cansaa Holistic Healing Centre",
    "address": "Chennai, India",
    "city": "Chennai",
    "website": "https://cansaa.in/",
    "image": "https://cansaa.in/wp-content/uploads/2024/08/cansaa-new-logo-01-1536x526.png",
    "contact_number": "+919840069377"
  },
  {
    "name": "Dr Iswarya's Nature Cure Centre",
    "education": "Naturopathy & Natural Healing Team",
    "workplace": "Dr Iswarya's Nature Cure Centre",
    "address": "Mandaveli, Chennai – 600028",
    "city": "Chennai",
    "website": "https://driswaryasnaturecure.com/",
    "image": "https://driswaryasnaturecure.com/wp-content/uploads/2025/04/DrNCC-Logo-1@4x-8-300x167.webp",
    "contact_number": "044-46187679"
  },
  {
    "name": "Pranic Wellness Centre",
    "education": "Pranic Healing & Holistic Therapy Team",
    "workplace": "Pranic Wellness Centre",
    "address": "Perungudi, Chennai",
    "city": "Chennai",
    "website": "https://pranicwellnesscentre.com/chennai-pranic-healing-contact/",
    "image": "https://via.placeholder.com/400x400?text=Pranic+Wellness",
    "contact_number": "+91 91768 80807"
  },
  {
    "name": "Rohini Holistic Health Centre",
    "education": "Ayurvedic / Holistic Health Practitioners",
    "workplace": "Rohini Holistic Health Centre",
    "address": "Mogappair West, Chennai - 600037",
    "city": "Chennai",
    "website": "https://jsdl.in/DT-20UKD8EM",
    "image": "https://via.placeholder.com/400x400?text=Rohini+Holistic",
    "contact_number": "07942701144"
  },
  {
    "name": "Dr.Charanya",
    "education": "BSMS, MSc - Psychology",
    "workplace": "Dr.C'S Wellness Centre Clinic",
    "address": "Ramnagar North, Chennai",
    "city": "Chennai",
    "website": "https://www.practo.com/chennai/therapist/charanya-psychologist",
    "image": "https://imagesx.practo.com/providers/dr-charanya-psychologist-coimbatore-d93b5188-fd1c-4857-93d1-547f5268a9c4.jpg?i_type=t_70x70",
    "contact_number": "+914471967143"
  },
  {
    "name": "Dr. Anju Soni",
    "education": "Post Graduate Diploma in Psychological Counseling, PhD",
    "workplace": "Coolwits, Choolai",
    "address": "Near Rainbow Apartments, Chennai",
    "city": "Chennai",
    "website": "https://www.practo.com/chennai/therapist/dr-anju-soni-psychologist",
    "image": "https://imagesx.practo.com/providers/dr-anju-soni-counselling-psychologist-chennai-e335d9ec-835e-4586-a7c1-c3adfc36b0a2.jpg?i_type=t_70x70",
    "contact_number": "+914446312570 Ext. 055"
  },
  {
    "name": "Ms. Ananthi",
    "education": "BSc - Psychology, MSc - Applied Psychology, MSc - Clinical Psychology",
    "workplace": "iQu Clinic, Kilpauk",
    "address": "Kilpauk, Chennai",
    "city": "Chennai",
    "website": "https://www.practo.com/chennai/therapist/s-ananthi-psychologist",
    "image": "https://imagesx.practo.com/providers/ms-ananthi-counselling-psychologist-chennai-3c5ebc6a-bf1b-4057-8e98-39635b0a2944.jpg?i_type=t_70x70",
    "contact_number": "+911142246362 Ext. 043"
  },
  {
    "name": "Dr. Pragya Rashmi",
    "education": "MSc, PhD - Psychology",
    "workplace": "Yashoda Hospitals",
    "address": "Secunderabad, Hyderabad, Telangana – 500003",
    "city": "Hyderabad",
    "website": "https://www.yashodahospitals.com/",
    "image": "https://d3upjtc0wh66ez.cloudfront.net/wp-content/uploads/2023/08/Dr-Pragya-Rashmi.png",
    "contact_number": "+91 40 4567 4567"
  },
  {
    "name": "Dr. O. Jyothi",
    "education": "MBBS, MD - Psychiatry, DPM (Psychiatry)",
    "workplace": "Asha Hospital",
    "address": "Banjara Hills, Hyderabad, Telangana",
    "city": "Hyderabad",
    "website": "https://ashahospital.org/",
    "image": "https://ashahospital.org/wp-content/uploads/2024/12/dr.jyothi.png",
    "contact_number": "+91 9666655558"
  },
  {
    "name": "Ms. Archana Nanduri",
    "education": "MSc - Psychology, PhD, ABNLP Certified NLP Practitioner",
    "workplace": "Vidyaranya Counselling Centre",
    "address": "Nagole, Hyderabad, Telangana",
    "city": "Hyderabad",
    "website": "https://www.bestpsychologisthyderabad.com/",
    "image": "https://static.wixstatic.com/media/2d1134_73fd0a21b9eb464d8907cf67e8d2fd61~mv2.jpg/v1/fill/w_183,h_199,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Photo%20Archana%20Nanduri%20(1)_edited.jpg",
    "contact_number": "+91 9014428518"
  },
  {
    "name": "Ms. Shiwani Kohli",
    "education": "MA - Psychology, M.Phil - Clinical Psychology",
    "workplace": "KIMS-Sunshine Hospitals",
    "address": "Begumpet, Hyderabad, Telangana 500016",
    "city": "Hyderabad",
    "website": "https://www.kimshospitals.com/",
    "image": "https://assets.kimshospitals.com/images/doctors/mrs-shiwani-kohli-psychologist_1712377723.jpg",
    "contact_number": "8008 108 108"
  },
  {
    "name": "Ms. Divya Gupta",
    "education": "Professional Diploma in Clinical Psychology",
    "workplace": "Continental Hospitals",
    "address": "Gachibowli, Hyderabad, Telangana 500032",
    "city": "Hyderabad",
    "website": "https://www.continentalhospitals.com/",
    "image": "https://continentalhospitals.com/images/doctors/8fba68be9be36a1ffbebe7c51d203727.jpg",
    "contact_number": "+91 40 6700 0000"
  },
  {
    "name": "Dr P Madhurima Reddy",
    "education": "M. Sc (Clinical Psychology)",
    "workplace": "Continental Hospitals",
    "address": "Gachibowli, Hyderabad, Telangana 500032",
    "city": "Hyderabad",
    "website": "https://www.continentalhospitals.com/",
    "image": "https://continentalhospitals.com/images/doctors/d4392415ee330183c25b1a679c3db411.webp",
    "contact_number": "+91 40 6700 0000"
  },
  {
    "name": "Holistic Wellness Clinic – Dr. Keerthi Rao",
    "education": "Homeopathy, Nutrition & Yoga Therapy",
    "workplace": "Holistic Wellness Clinic",
    "address": "Nanakramguda, Hyderabad, Telangana 500032",
    "city": "Hyderabad",
    "website": "https://holisticwellnessbydrrao.com/",
    "image": "https://via.placeholder.com/400x400?text=Holistic+Wellness",
    "contact_number": "+91-8247567933"
  },
  {
    "name": "Chakrasiddh Holistic Healing Center",
    "education": "Siddha Vaidya & energy-based wellness practices",
    "workplace": "Chakrasiddh Holistic Healing Center",
    "address": "Mokila, Hyderabad, Telangana 501203",
    "city": "Hyderabad",
    "website": "https://heal.chakrasiddh.com/",
    "image": "https://heal.chakrasiddh.com/wp-content/uploads/2025/07/Screenshot-2025-07-21-110029-3.png",
    "contact_number": "+91 8645658402"
  },
  {
    "name": "Akhil Holistic Health and Wellness Care",
    "education": "Multispeciality clinic – Physiotherapy & holistic wellness",
    "workplace": "Akhil Holistic Health and Wellness Care",
    "address": "Banjara Hills, Hyderabad, Telangana",
    "city": "Hyderabad",
    "website": "https://www.practo.com/hyderabad/clinic/akhil-holistic-health-and-wellness-care-banjara-hills-1",
    "image": "https://images1-fabric.practo.com/practices/1182022/akhil-holistic-health-and-wellness-care-hyderabad-5dd69874e7a05.jpg",
    "contact_number": "04067822790 Ext. 479"
  },
  {
    "name": "Sri Sri Holistic Hospital",
    "education": "Holistic health & multi-speciality medical team",
    "workplace": "Sri Sri Holistic Hospital",
    "address": "Hyderabad, Telangana",
    "city": "Hyderabad",
    "website": "https://srisriholistichospitals.com/",
    "image": "https://via.placeholder.com/400x400?text=Sri+Sri+Hospital",
    "contact_number": "9240212342"
  },
  {
    "name": "Patanjali Wellness Centre",
    "education": "Integrated Wellness-Naturopathy/Ayurveda/Acupuncture",
    "workplace": "Patanjali Wellness Centre",
    "address": "Secunderabad-500011",
    "city": "Hyderabad",
    "website": "https://patanjaliwellness.com/Hyderabad.php",
    "image": "https://patanjaliwellness.com/pwc-centerlanding/images/hydrabad/logo.png",
    "contact_number": "+91-7070999313"
  },
  {
    "name": "Sanjeevani Pranic Healing",
    "education": "Certified Pranic Healing & Meditation practitioners",
    "workplace": "Sanjeevani Wellness & Meditation Studio",
    "address": "Gachibowli, Hyderabad, Telangana – 500032",
    "city": "Hyderabad",
    "website": "https://www.pranichealinghyderabad.com/",
    "image": "https://static.wixstatic.com/media/cc3c89_03fbe4e17fd3450dbc908be4a2bea2d1~mv2.jpg/v1/crop/x_1,y_0,w_466,h_165/fill/w_221,h_77,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202024-05-05%20171910_edited.jpg",
    "contact_number": "+91-95500 32000"
  },
  {
    "name": "Vamsi Holistic Wellness Centre",
    "education": "Holistic Wellness Practitioner",
    "workplace": "Vamsi Holistic Wellness Center",
    "address": "Malkajgiri, Secunderabad, Telangana 500047",
    "city": "Hyderabad",
    "website": "https://vamsiholistic.in/",
    "image": "https://vamsiholistic.in/wp-content/uploads/2022/08/vamsilogo.png",
    "contact_number": "+91-95427 02549"
  },
  {
    "name": "Dr. N. Hemalatha",
    "education": "Consultant Clinical Psychologist",
    "workplace": "KIMS Hospitals",
    "address": "Kondapur, Hyderabad, Telangana 500084",
    "city": "Hyderabad",
    "website": "https://www.kimshospitals.com/",
    "image": "https://assets.kimshospitals.com/images/doctors/kims-doc-profile_1739334140.png",
    "contact_number": "+91 40 6750 5050"
  },
  {
    "name": "Ms. Aarathi Selvan",
    "education": "Clinical Psychologist",
    "workplace": "Pause for Perspective",
    "address": "Begumpet, Hyderabad",
    "city": "Hyderabad",
    "website": "https://www.pauseforperspective.com/",
    "image": "https://hyderabadpsychologist.com/wp-content/uploads/2025/05/Aarathi-3-scaled.jpg",
    "contact_number": "+91- 9490708947"
  },
  {
    "name": "Dr. Sameer Malhotra",
    "education": "MBBS, MD (Psychiatry), CCST (UK)",
    "workplace": "Max Super Speciality Hospital, Saket",
    "address": "Saket, New Delhi, Delhi, 110017",
    "city": "Delhi",
    "website": "https://www.maxhealthcare.in/",
    "image": "https://d35oenyzp35321.cloudfront.net/Dr_Sameer_Malhotra_9367a7e798.jpg",
    "contact_number": "011-26515050"
  },
  {
    "name": "Dr. Samir Parikh",
    "education": "MBBS, DPM (Psychiatry), MD (Psychiatry)",
    "workplace": "Fortis Hospital, Vasant Kunj",
    "address": "Vasant Kunj, New Delhi, Delhi - 110070",
    "city": "Delhi",
    "website": "https://www.fortishealthcare.com/",
    "image": "https://www.fortishealthcare.com/drupal-data/styles/doctor_image/azblob/doctors/dr-samir-parikh-1387.png?itok=Qpz8l3Nt",
    "contact_number": "011-42776222"
  },
  {
    "name": "Dr. Arti Anand",
    "education": "M.Phil - Psychology, PhD Psychology",
    "workplace": "Sir Ganga Ram Hospital",
    "address": "Old Rajinder Nagar, New Delhi",
    "city": "Delhi",
    "website": "https://sgrh.com/",
    "image": "https://sgrh.com/assets/img/profile/gaa2890.png",
    "contact_number": "011-42251071"
  },
  {
    "name": "Dr. Mausumi Sinha",
    "education": "BSc, MSc (Nursing), MA, MPhil, Diploma (Psychiatry)",
    "workplace": "VIMHANS",
    "address": "Nehru Nagar, New Delhi-110065",
    "city": "Delhi",
    "website": "https://www.vimhans.com/",
    "image": "https://via.placeholder.com/400x400?text=Dr+Mausumi",
    "contact_number": "011-4099-0000"
  },
  {
    "name": "Dr. (Prof) R K Suri",
    "education": "Ph.D - Psychology, M.Phil (Clinical Psychology)",
    "workplace": "Psychowellness Center",
    "address": "Dwarka, New Delhi, Delhi, 110078",
    "city": "Delhi",
    "website": "https://www.psychowellnesscenter.com/",
    "image": "https://www.psychowellnesscenter.com/wp-content/uploads/2025/04/Dr-R-K-Suri-1.jpg",
    "contact_number": "+91 98106 36188"
  },
  {
    "name": "Dr. Pooja Anand Sharma",
    "education": "Ph.D - Psychology, M.Sc. - Counselling and Psychotherapy",
    "workplace": "Vishwas Healing Centre",
    "address": "Rohini - 110085",
    "city": "Delhi",
    "website": "https://www.vishwashealingcentre.com/",
    "image": "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_500/https://www.vishwashealingcentre.com/wp-content/uploads/2025/03/Photo.jpeg",
    "contact_number": "+91-8920354903"
  },
  {
    "name": "Dr. Bakshi's Healthcare",
    "education": "Team of Psychologists, Physicians and Nutritionists",
    "workplace": "Dr. Bakshi's Healthcare",
    "address": "Old Rajendra Nagar, New Delhi–110005",
    "city": "Delhi",
    "website": "https://drbakshishealthcare.com/",
    "image": "https://drbakshishealthcare.com/assets/images/dbh.svg",
    "contact_number": "+91 8588-86-8686"
  },
  {
    "name": "Bliss Care - Dr. Poonam Bali",
    "education": "B.H.M.S. (Gold Medallist), Post Graduate Homoeopathy",
    "workplace": "Bliss Care Holistic Health Centre",
    "address": "Hauz Khas, New Delhi – 110016",
    "city": "Delhi",
    "website": "https://drbalisbliss.com/",
    "image": "https://drbalisbliss.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-25-at-13.53.36_992dd5d4-e1758794482552-714x1024.jpg",
    "contact_number": "+91-9810469956"
  },
  {
    "name": "Holistic Health Centre - Dr. Sanchita Bhattacharya",
    "education": "MBBS, PGD Preventive & Promotive Health",
    "workplace": "Holistic Health Centre for Integrative Medicine",
    "address": "Chittaranjan Park, New Delhi – 110019",
    "city": "Delhi",
    "website": "https://www.goholistic.org.in/",
    "image": "https://static.wixstatic.com/media/1e1ecc_78d76010fe5c43028dfb4132def78a51~mv2.png/v1/crop/x_32,y_0,w_549,h_645/fill/w_286,h_337,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3_20220911_163331_0002.png",
    "contact_number": "+91-9811190356"
  },
  {
    "name": "The Healing Room",
    "education": "Theta Healing, Inner Child Therapy",
    "workplace": "The Healing Room",
    "address": "Bijwasan, New Delhi, Delhi, 110061",
    "city": "Delhi",
    "website": "https://thehealingroom.in/",
    "image": "https://thehealingroom.in/wp-content/uploads/2025/05/Untitled-design-74.png",
    "contact_number": "+91-9560641801"
  },
  {
    "name": "Dr. Achal Bhagat",
    "education": "MBBS, MD (Psychiatry), MRCPsych",
    "workplace": "Indraprastha Apollo Hospital",
    "address": "Sarita Vihar, New Delhi, 110076",
    "city": "Delhi",
    "website": "https://www.apollohospitals.com/",
    "image": "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-03/achal_bhagat.png",
    "contact_number": "011-71791090"
  },
  {
    "name": "Dr. Rakhi Anand",
    "education": "Ph.D (Clinical Psychology)",
    "workplace": "Indraprastha Apollo Hospital",
    "address": "Sarita Vihar, New Delhi, 110076",
    "city": "Delhi",
    "website": "https://www.apollohospitals.com/",
    "image": "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-01/dr-rakhi-anand-psychology-in-delhi.png",
    "contact_number": "011-71791090"
  },
  {
    "name": "Dr. Jitendra Nagpal",
    "education": "MD (Psychiatry), DNB (Psychiatry), MBBS",
    "workplace": "Moolchand Hospital",
    "address": "Lajpat Nagar III, New Delhi 110024",
    "city": "Delhi",
    "website": "https://moolchandhealthcare.com/",
    "image": "https://moolchandhealthcare.com/uploads/doctors/2018/01/71395a50b1050f9f442719-322x200.jpg",
    "contact_number": "+91 11 4200 0000"
  },
  {
    "name": "Institute of Human Behaviour and Allied Sciences (IHBAS)",
    "education": "Department of Mental Health",
    "workplace": "IHBAS",
    "address": "Dilshad Garden, Delhi 110095",
    "city": "Delhi",
    "website": "https://ihbas.delhi.gov.in/",
    "image": "https://ihbas.delhi.gov.in/sites/default/files/ihbas/intro/ihb_1.jpg",
    "contact_number": "011-22114021"
  },
  {
    "name": "Manas Foundation",
    "education": "Team of Psychiatrists",
    "workplace": "Manas Foundation",
    "address": "Okhla Phase II, New Delhi-110020",
    "city": "Delhi",
    "website": "https://manasfoundation.org.in/",
    "image": "https://manasfoundation.org.in/wp-content/uploads/2021/11/Full-logo-colour-png-1.png",
    "contact_number": "+918209688277"
  },
  {
    "name": "Ms. Komal Manshani",
    "education": "Clinical Psychologist",
    "workplace": "Max Smart Super Speciality Hospital, Saket",
    "address": "Saket, New Delhi 110017",
    "city": "Delhi",
    "website": "https://www.maxhealthcare.in/",
    "image": "https://d35oenyzp35321.cloudfront.net/Komal_6e8958b1b7.jpg",
    "contact_number": "011-71212121"
  },
  {
    "name": "Dr. Srishti Saha",
    "education": "M.Phil. in Clinical Psychology, B.Sc, M.Sc",
    "workplace": "Fortis Hospital, Anandapur",
    "address": "Anandapur, Kolkata, West Bengal 700107",
    "city": "Kolkata",
    "website": "https://www.fortishealthcare.com/",
    "image": "https://www.fortishealthcare.com/drupal-data/styles/doctor_image/azblob/doctors/dr-srishti-saha-13157.jpg?itok=yt6-hehV",
    "contact_number": "033 6628 4444"
  },
  {
    "name": "Dr. Deboshila Bose",
    "education": "B.Sc (Psychology Hons), M.Sc (Applied Psychology)",
    "workplace": "Fortis Hospital, Anandapur",
    "address": "Anandapur, Kolkata, West Bengal 700107",
    "city": "Kolkata",
    "website": "https://www.fortishealthcare.com/",
    "image": "https://www.fortishealthcare.com/drupal-data/styles/doctor_image/azblob/doctors/dr-deboshila-bose-4817.png?itok=QMBdPsMf",
    "contact_number": "033 6628 4444"
  },
  {
    "name": "Dr. Prof Col Pradyot Sarkar",
    "education": "MBBS, M.D. (Psychiatry)",
    "workplace": "Apollo Multispeciality Hospitals",
    "address": "Kankurgachi, Kolkata, West Bengal 700054",
    "city": "Kolkata",
    "website": "https://www.apollohospitals.com/",
    "image": "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-07/dr-prof-col-pradyot-sarkar.png",
    "contact_number": "033 4420 2122"
  },
  {
    "name": "Dr. Jai Ranjan Ram",
    "education": "MBBS, MD, MRCPsych, CCST",
    "workplace": "Apollo Multispeciality Hospitals",
    "address": "Kankurgachi, Kolkata, West Bengal 700054",
    "city": "Kolkata",
    "website": "https://www.apollohospitals.com/",
    "image": "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-01/dr-jai-ranjan-ram-psychiatry-in-kolkata.png",
    "contact_number": "033 4420 2122"
  },
  {
    "name": "Meenakshi Khorana Saha",
    "education": "Masters in Psychology, PG Diploma in Rehabilitation Psychology",
    "workplace": "Healing Minds",
    "address": "Jodhpur Park, Kolkata, West Bengal 700068",
    "city": "Kolkata",
    "website": "https://healingmindz.in/",
    "image": "https://healingmindz.in/assets/img/gallery/about.jpeg",
    "contact_number": "+91 81005 60766"
  },
  {
    "name": "Dr. Sagnik Mukherjee",
    "education": "MBBS, MD (Psychiatry)",
    "workplace": "Kolkata Super Speciality Mental Nursing Home",
    "address": "Rajpur Sonarpur, Kolkata, West Bengal 700145",
    "city": "Kolkata",
    "website": "https://kolkatamentalhospital.com/",
    "image": "https://kolkatamentalhospital.com/wp-content/media/2023/06/about-image.png",
    "contact_number": "+91 90629 99922"
  },
  {
    "name": "Spirit Foundation",
    "education": "Mental Rehabilitation and Holistic Healing",
    "workplace": "Spirit Foundation",
    "address": "Sodepur, Kolkata, West Bengal 700110",
    "city": "Kolkata",
    "website": "https://spiritfoundation.in/",
    "image": "https://spiritfoundation.in/wp-content/uploads/abtussouvik_img.jpg",
    "contact_number": "+91-9051862484"
  },
  {
    "name": "Dr. Arnab Ghosh Hajra",
    "education": "MBBS, MD (Psychiatry)",
    "workplace": "Baghbazar Drug Hall",
    "address": "Shyam Bazar, Kolkata",
    "city": "Kolkata",
    "website": "https://www.amrihospitals.in/",
    "image": "https://imagesx.practo.com/providers/dr-arnab-ghosh-hajra-psychiatrist-kolkata-514bf5b4-a119-4a14-aeae-ee147c270ffe.jpg?i_type=t_70x70",
    "contact_number": "02071186508 Ext. 277"
  },
  {
    "name": "Dr. Indranil Saha",
    "education": "MBBS, MD (Psychiatry), DPM",
    "workplace": "Neuromind Clinic",
    "address": "Green View, Kolkata",
    "city": "Kolkata",
    "website": "https://www.practo.com/kolkata/doctor/indranil-saha-psychiatrist",
    "image": "https://imagesx.practo.com/providers/dr-indranil-saha-neuropsychiatrist-kolkata-0ff6df56-cf3a-4bbe-bcf1-f48872d1bec9.jpg?i_type=t_70x70",
    "contact_number": "+91 98303 12090"
  },
  {
    "name": "Dr. Era Dutta",
    "education": "MBBS, MD (Psychiatry), DNB",
    "workplace": "Dr. Era Dutta's Mind Wellness",
    "address": "Ballygunge, Kolkata, West Bengal 700019",
    "city": "Kolkata",
    "website": "https://dreradutta.com/",
    "image": "https://dreradutta.com/wp-content/uploads/2020/03/B_0028-F.jpg",
    "contact_number": "91 9674342789"
  },
  {
    "name": "Dr. Sarmistha Chakrabarti",
    "education": "MBBS, MRCPsych, DPM",
    "workplace": "Manipal Hospital",
    "address": "Bidhannagar, Kolkata, West Bengal - 700106",
    "city": "Kolkata",
    "website": "https://www.manipalhospitals.com/",
    "image": "https://www.manipalhospitals.com/uploads/doctors_photo/dr-sarmishtha-chakrabarti-psychiatry.png",
    "contact_number": "+91 98310 59486"
  },
  {
    "name": "MON Psychiatric Nursing Home",
    "education": "Comprehensive Psychiatric & Psychological Services",
    "workplace": "MON Psychiatric Nursing Home",
    "address": "Kaikhali, Kolkata, West Bengal 700052",
    "city": "Kolkata",
    "website": "https://monclinics.in/",
    "image": "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/mjEqo9rx9MSgx7G7/a-new-design-8-mePx2kqzoPc5gEVq.jpg",
    "contact_number": "033 2465 6753"
  },
  {
    "name": "Dr. Amitabha Mukerji",
    "education": "MD (Psychiatry)",
    "workplace": "Mind Care Clinic",
    "address": "Lake Town, Kolkata, West Bengal 700089",
    "city": "Kolkata",
    "website": "https://www.practo.com/kolkata/doctor/dr-amitabha-mukerji-psychiatrist",
    "image": "https://imagesx.practo.com/providers/dr-amitabha-mukerji-psychiatrist-kolkata-417f64e1-c689-49c8-9866-ca022b76ab66.jpg?i_type=t_70x70",
    "contact_number": "03341816952 Ext. 464"
  },
  {
    "name": "Dr. Indrani Datta",
    "education": "PhD (Clinical Psychology)",
    "workplace": "Manon- A Centre For Positive Mental Health",
    "address": "Baghajatin, Kolkata, West Bengal 700047",
    "city": "Kolkata",
    "website": "https://www.practo.com/kolkata/therapist/dr-indrani-dutta-psychologist-1",
    "image": "https://imagesx.practo.com/providers/dr-indrani-datta-clinical-psychologist-kolkata-00cb68f2-7676-454f-adb1-895ea0d79bac.jpg?i_type=t_70x70",
    "contact_number": "03341816953 Ext. 222"
  },
  {
    "name": "Swastya Holistic Healing Centre",
    "education": "Sound Healing, Aura Photography, Past Life Regression, Reiki",
    "workplace": "Swastya Holistic Healing Centre",
    "address": "Lake Gardens, Kolkata, West Bengal",
    "city": "Kolkata",
    "website": "https://www.swastyahealing.com/",
    "image": "https://www.swastyahealing.com/images/flower.png",
    "contact_number": "+91 98310 26070"
  },
  {
    "name": "Dr. Jinesh Shah",
    "education": "MBBS, MRCPsych (UK), CCT in Adult & Child Psychiatry",
    "workplace": "Apollo Speciality Hospital",
    "address": "Ellisbridge, Ahmedabad, GJ, 380006",
    "city": "Ahmedabad",
    "website": "https://www.apollohospitals.com/doctors/psychiatrist/ahmedabad/dr-jinesh-shah",
    "image": "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-05/dr-jinesh-shah---psychiatry.png",
    "contact_number": "079 6630 5800"
  },
  {
    "name": "Zydus Hospital - Mental Health",
    "education": "Team of Psychologists",
    "workplace": "Zydus Hospital",
    "address": "S.G. Highway, Ahmedabad - 380054",
    "city": "Ahmedabad",
    "website": "https://zydushospitals.com/psychology",
    "image": "https://zydushospitals.com/public/theme/front/images/logo/zydus-logo.svg",
    "contact_number": "+91 79 66 19 0201"
  },
  {
    "name": "Purvangi Shukla",
    "education": "Psychotherapist Counsellor",
    "workplace": "PURVANGISHUKLA MINDPSYCHOLOGIST LLP",
    "address": "Thaltej, Ahmedabad, Gujarat 380054",
    "city": "Ahmedabad",
    "website": "https://www.purvangishukla.com/",
    "image": "https://www.purvangishukla.com/wp-content/uploads/2024/11/purvangishukla.png",
    "contact_number": "+91 997-844-0998"
  },
  {
    "name": "Dr. Reena Sharma",
    "education": "PhD (Psychologist)",
    "workplace": "The Mind Practice",
    "address": "Makarba, Ahmedabad, Gujarat 380051",
    "city": "Ahmedabad",
    "website": "https://www.themindpractice.in/",
    "image": "https://static.wixstatic.com/media/dbdacc_d0930c0c0b594acdae29059c136f2d82~mv2.jpg/v1/fill/w_281,h_538,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/dbdacc_d0930c0c0b594acdae29059c136f2d82~mv2.jpg",
    "contact_number": "9811510003"
  },
  {
    "name": "Dr. Asha Patel",
    "education": "M.D(A.M.), Dihom (U.K.), P.G.D.N.D.",
    "workplace": "Spandan Holistic Healing Care",
    "address": "Bodakdev, Ahmedabad",
    "city": "Ahmedabad",
    "website": "https://spandanholistic.com/",
    "image": "https://spandanholistic.com/wp-content/uploads/2024/02/bx3.jpg",
    "contact_number": "07942699364"
  },
  {
    "name": "Dr. Pradip Vaghasiya",
    "education": "MBBS, M.D. (Psychiatry)",
    "workplace": "Manas Neuro Psychiatry Clinic",
    "address": "Ghodasar, Ahmedabad-380050",
    "city": "Ahmedabad",
    "website": "https://www.practo.com/ahmedabad/doctor/dr-pradip-vaghasiya-psychiatrist",
    "image": "https://imagesx.practo.com/providers/dr-pradip-vaghasiya-addiction-psychiatrist-ahmedabad-a16b375d-3430-43f3-8585-7adc1f82aead.jpg?i_type=t_70x70",
    "contact_number": "07971268819 Ext. 521"
  },
  {
    "name": "Dr. Rupali Mohbe",
    "education": "PhD (Psychology)",
    "workplace": "BIRDY ME",
    "address": "Motera, Ahmedabad",
    "city": "Ahmedabad",
    "website": "https://www.practo.com/ahmedabad/therapist/rupali-mohbe-1-psychologist",
    "image": "https://imagesx.practo.com/providers/dr-rupali-mohbe-clinical-psychologist-ahmedabad-eb770167-251e-45ba-8bde-0faf162a90e3.jpg?i_type=t_70x70",
    "contact_number": "08037298749 Ext. 512"
  },
  {
    "name": "Dr. Hansal Bhachech",
    "education": "MD (Psychiatry)",
    "workplace": "HCG Hospital",
    "address": "Ellisbridge, Ahmedabad, Gujarat 380006",
    "city": "Ahmedabad",
    "website": "https://www.hcghospitals.in/",
    "image": "https://www.malefemale.in/wp-content/gallery/photogallary/hb.jpg",
    "contact_number": "7669100262"
  },
  {
    "name": "Dr. Harsh Oza",
    "education": "MD (Psychiatry)",
    "workplace": "Lifeline Multi Speciality Hospital",
    "address": "Chandlodia Gota, Ahmedabad",
    "city": "Ahmedabad",
    "website": "https://www.practo.com/ahmedabad/doctor/dr-harsh-oza-psychiatrist",
    "image": "https://imagesx.practo.com/providers/dr-harsh-oza-neuropsychiatrist-ahmedabad-9cb960bc-c915-47de-ab00-cab529af588a.jpg?i_type=t_70x70",
    "contact_number": "07971268678 Ext. 544"
  },
  {
    "name": "Dr. Parth Vaishnav",
    "education": "MD (Psychiatry)",
    "workplace": "Samvedana Psychiatric Hospital",
    "address": "Opp. Town Hall, Ahmedabad",
    "city": "Ahmedabad",
    "website": "https://www.practo.com/ahmedabad/doctor/parth-vaishnav-psychiatrist",
    "image": "https://images.drlogy.com/assets/uploads/img/practice-profile/doctors/photo/thumb/dr-parth-vaishnav-623a80b8cce-10912b5e5eb.jpg",
    "contact_number": "07941058558 Ext. 088"
  },
  {
    "name": "Dr. Spandan Thaker",
    "education": "MD (Psychiatry)",
    "workplace": "Mood and Mind Clinic",
    "address": "Prahladnagar, Ahmedabad",
    "city": "Ahmedabad",
    "website": "https://www.practo.com/ahmedabad/doctor/spandan-thaker-psychiatrist",
    "image": "https://imagesx.practo.com/providers/dr-spandan-thaker-psychiatrist-ahmedabad-047d918c-de2c-471f-8b0b-a05fe692752a.jpg?i_type=t_70x70",
    "contact_number": "07971268654 Ext. 244"
  },
  {
    "name": "Ms. Nupur Gupta",
    "education": "Psychologist",
    "workplace": "Rediscover Self",
    "address": "Prahlad Nagar, Ahmedabad",
    "city": "Ahmedabad",
    "website": "https://www.practo.com/Ahmedabad/doctor/nupur-gupta-psychologist",
    "image": "https://imagesx.practo.com/providers/ms-nupur-gupta-clinical-psychologist-ahmedabad-b6034451-6c9d-4440-b688-3b4d2cdd8b9a.jpg?i_type=t_70x70",
    "contact_number": "07941058791 Ext. 001"
  },
  {
    "name": "GIPS Psychiatric Clinic",
    "education": "Team of Psychiatrists",
    "workplace": "GIPS Psychiatric Clinic",
    "address": "C.G.Road, Ellisbridge, Ahmedabad",
    "city": "Ahmedabad",
    "website": "http://www.gipshospital.com/",
    "image": "https://www.gipshospital.com/img/Gips-Logo.png",
    "contact_number": "08448108108"
  },
  {
    "name": "Dr. Keyur Panchal",
    "education": "MD (Psychiatry)",
    "workplace": "Sal Hospital",
    "address": "Thaltej, Ahmedabad, Gujarat 380054",
    "city": "Ahmedabad",
    "website": "https://www.practo.com/ahmedabad/doctor/keyur-panchal-psychiatrist",
    "image": "https://imagesx.practo.com/providers/dr-keyur-panchal-psychiatrist-ahmedabad-36188c13-2417-4658-85b6-284b15d8dccf.jpg?i_type=t_70x70",
    "contact_number": "07941058566 Ext. 355"
  },
  {
    "name": "CHt. Nira Patel",
    "education": "Certified Clinical Psychologist, Hypnotherapist & Holistic Healer",
    "workplace": "The Healing Space",
    "address": "Naranpura, Ahmedabad, Gujarat 380013",
    "city": "Ahmedabad",
    "website": "https://consult.nirapatel.in/",
    "image": "https://consult.nirapatel.in/images/About-Us.webp",
    "contact_number": "+91-96240 77144"
  }

];

const FindTherapist = () => {
  const [search, setSearch] = useState("");

  const filteredTherapists = therapists.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center pt-24 pb-20 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-sm uppercase tracking-wide text-blue-500 font-medium">
          Find Support
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3">
          Find a Therapist
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Connect with certified therapists, psychologists, and counselors to
          support your emotional wellness journey.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-10">
        <input
          type="text"
          placeholder="Search by name or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
        />
      </div>

      {/* Therapist List */}
      <div className="w-full max-w-4xl space-y-6">
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map((therapist, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 flex items-center gap-6 hover:shadow-md transition-shadow duration-300"
            >
              {/* Circle Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={therapist.image || "https://via.placeholder.com/400x400?text=No+Image"}
                  alt={therapist.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-200"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                  }}
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {therapist.name}
                </h2>
                <p className="text-sm text-blue-600 mt-1">
                  {therapist.education}
                </p>
                <p className="mt-2 text-gray-700 font-medium">
                  {therapist.workplace}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {therapist.address}, {therapist.city}
                </p>
                
                {therapist.contact_number && (
                  <p className="text-gray-600 text-sm mt-1">
                    📞 {therapist.contact_number}
                  </p>
                )}

                <div className="mt-4 flex gap-3">
                  {therapist.website && (
                    <a
                      href={therapist.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
                    >
                      {therapist.website.startsWith("tel:")
                        ? "Call Now"
                        : "Visit Website"}
                    </a>
                  )}
                  
                  {therapist.contact_number && (
                    <a
                      href={`tel:${therapist.contact_number.split(',')[0].trim()}`}
                      className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors duration-300"
                    >
                      Call
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">
            No therapists found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindTherapist;