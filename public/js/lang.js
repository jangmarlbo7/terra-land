// public/js/lang.js — All UI translations + Lang manager

const TRANSLATIONS = {
  lo: {
    // NAV
    nav_home: 'ໜ້າຫຼັກ', nav_listings: 'ລາຍຊື່', nav_cat: 'ປະເພດ',
    nav_why: 'ເປັນຫຍັງ', nav_contact: 'ຕິດຕໍ່', nav_about: 'ກ່ຽວກັບ',
    // HERO
    hero_eyebrow: '// ຕະຫຼາດທີ່ດິນລາວ',
    hero_title: 'ທີ່ດິນທຳເລດີ<br><i>ລາຄາຄຸ້ມຄ່າ</i>',
    hero_sub: 'ຄັດສັນທີ່ດິນຄຸນນະພາບທົ່ວລາວ. ຜ່ານການກວດສອບເອກະສານ. ຕິດຕໍ່ເຈົ້າຂອງໂດຍກົງ.',
    hero_btn1: 'ເບິ່ງລາຍຊື່', hero_btn2: 'ຕິດຕໍ່ຫາ',
    hs_plots: 'ໜ່ວຍທີ່ດິນ', hs_prov: 'ແຂວງ', hs_exp: 'ປີປະສົບການ',
    // SEARCH
    s_heading: '// ຄົ້ນຫາທີ່ດິນ',
    sf_loc: 'ສະຖານທີ່', sf_loc_ph: 'ເຊັ່ນ: ວຽງຈັນ, ສະຫວັນ...',
    sf_price: 'ໄລຍະລາຄາ', sf_size: 'ຂະໜາດທີ່ດິນ', sf_type: 'ປະເພດທີ່ດິນ',
    sf_all: 'ທັງໝົດ', s_btn: 'ຄົ້ນຫາ →',
    price_all: 'ທຸກລາຄາ', price_1: '< 1 ລ້ານ', price_5: '1–5 ລ້ານ',
    price_10: '5–10 ລ້ານ', price_99: '10 ລ້ານ+',
    size_all: 'ທຸກຂະໜາດ', size_s: '< 1 ຮ', size_m: '1–5 ຮ',
    size_l: '5–20 ຮ', size_xl: '20+ ຮ',
    // LAND TYPES
    t_agricultural: 'ກະສິກຳ', t_residential: 'ທີ່ຢູ່ອາໄສ', t_commercial: 'ການຄ້າ',
    t_industrial: 'ອຸດສາຫະກຳ', t_forest: 'ປ່າໄມ້',
    t_roadside: 'ຂ້າງທາງ', t_investment: 'ການລົງທຶນ',
    t_empty: 'ທີ່ຫວ່າງ', t_other: 'ອື່ນໆ',
    // LISTINGS
    fl_tag: '// ທີ່ດິນແນະນຳ', fl_title: 'ລາຍຊື່ທີ່ດິນ',
    fl_sub: 'ທີ່ດິນຄຸນນະພາບທີ່ຄັດສັນ ພ້ອມລາຄາທີ່ດີທີ່ສຸດ.',
    fl_more: 'ເບິ່ງທັງໝົດ', fl_less: 'ຫຍໍ້ລົງ',
    card_view: 'ເບິ່ງລາຍລະອຽດ', price_l: 'ລາຄາ',
    badge_featured: 'ແນະນຳ', badge_new: 'ໃໝ່',
    // CATEGORIES
    cat_tag: '// ປະເພດທີ່ດິນ', cat_title: 'ເລືອກທີ່ດິນຕາມປະເພດ',
    cat_empty: 'ທີ່ດິນຫວ່າງ', cat_agri: 'ດິນກະສິກຳ',
    cat_road: 'ດິນຂ້າງທາງ', cat_inv: 'ດິນລົງທຶນ',
    cat_plots: 'ໜ່ວຍ',
    // WHY
    why_tag: '// ເປັນຫຍັງຕ້ອງເລືອກພວກເຮົາ',
    why_title: 'ໄວ້ວາງໃຈໄດ້',
    why_sub: 'ພວກເຮົາໃຫ້ລູກຄ້າທຸກທ່ານໄດ້ຮັບປະສົບການທີ່ດີທີ່ສຸດ.',
    why1_t: 'ເອກະສານຜ່ານການກວດ', why1_d: 'ທຸກເອກະສານທີ່ດິນກວດສອບຢ່າງລະອຽດ ກ່ອນລົງລາຍຊື່.',
    why2_t: 'ຂະບວນການໂປ່ງໃສ', why2_d: 'ທຸກຂັ້ນຕອນອະທິບາຍຊັດເຈນ ບໍ່ມີຄ່າໃຊ້ຈ່າຍຕື່ມ.',
    why3_t: 'ທີມງານມືອາຊີບ', why3_d: 'ທີ່ປຶກສາດ້ານທີ່ດິນທີ່ມີປະສົບການ ພ້ອມຊ່ວຍທ່ານ.',
    why4_t: 'ລາຄາດີທີ່ສຸດ', why4_d: 'ລາຍຊື່ກົງຈາກເຈົ້າຂອງ ບໍ່ຜ່ານນາຍໜ້າ.',
    why5_t: 'ລາຍງານທີ່ດິນ', why5_d: 'ໄດ້ຮັບລາຍງານລາຍລະອຽດ ພ້ອມຮູບພາບ ແລະ ສໍາຫຼວດ.',
    why6_t: 'ສະໜັບສະໜຸນຫຼັງການຂາຍ', why6_d: 'ສະໜັບສະໜຸນທ່ານຕະຫຼອດຂະບວນການໂອນ.',
    // HOW IT WORKS
    hiw_tag: '// ຂັ້ນຕອນ', hiw_title: 'ວິທີການຊື້ທີ່ດິນ',
    step1_t: 'ຄົ້ນຫາ', step1_d: 'ຄົ້ນຫາທີ່ດິນດ້ວຍຕົວກັ່ນຕອງ ຕາມສະຖານທີ່ ແລະ ງົບປະມານ.',
    step2_t: 'ນັດຊົມ', step2_d: 'ນັດໝາຍກັບທີ່ປຶກສາ ໄປຢ້ຽມຢາມທີ່ດິນທີ່ທ່ານສົນໃຈ.',
    step3_t: 'ກວດສອບ', step3_d: 'ກວດສອບເອກະສານ ແລະ ໂຉນທີ່ດິນກັບທີ່ປຶກສາ.',
    step4_t: 'ໂອນ', step4_d: 'ດຳເນີນການໂອນຢ່າງຖືກຕ້ອງ ຜ່ານສ່ວນງານທີ່ດິນ.',
    // CONTACT
    c_tag: '// ຕິດຕໍ່ຫາ', c_title: 'ພວກເຮົາຢູ່ທີ່ນີ້',
    c_sub: 'ຕິດຕໍ່ຫາທີ່ປຶກສາ ສອບຖາມ ຫຼື ນັດຊົມທີ່ດິນ.',
    c_phone_l: 'ໂທລະສັບ', c_chat: 'ຮ່ວມສົນທະນາ',
    cf_name: 'ຊື່ຂອງທ່ານ', cf_email: 'ອີເມວ',
    cf_phone: 'ເບີໂທ', cf_interest: 'ສົນໃຈ',
    cf_msg: 'ຂໍ້ຄວາມ', cf_send: 'ສົ່ງ →',
    cfi_buy: 'ຊື້ທີ່ດິນ', cfi_sell: 'ຂາຍທີ່ດິນ', cfi_info: 'ສອບຖາມທົ່ວໄປ',
    contact_sent: 'ສົ່ງຂໍ້ຄວາມແລ້ວ!', contact_err: 'ກະລຸນາຕື່ມໃສ່ຂໍ້ມູນທີ່ຈຳເປັນ.',
    // ABOUT
    ab_tag: '// ກ່ຽວກັບ TERRA', ab_title: 'ຜູ້ນຳດ້ານທີ່ດິນ',
    ab_text: 'TERRA Land ກໍ່ຕັ້ງໃນປີ 2009 ໂດຍທີ່ປຶກສາດ້ານທີ່ດິນທີ່ມີປະສົບການ. ພວກເຮົາໃຫ້ບໍລິການຊື້-ຂາຍ ແລະ ປຶກສາທີ່ດິນທົ່ວລາວ ດ້ວຍຄວາມໜ້າເຊື່ອຖືສູງ.',
    ab_btn: 'ຕິດຕໍ່ຫາ →',
    an_years: 'ປີ', an_sold: 'ຂາຍແລ້ວ', an_happy: 'ລູກຄ້າພໍໃຈ',
    // MAP
    map_title: 'ສະຖານທີ່ຂອງພວກເຮົາ',
    map_sub: 'ຫ້ອງການ ແລະ ທີ່ດິນທີ່ມີ',
    map_dir: 'ຊອກທາງ', map_sb: 'ທີ່ດິນໃກ້ຄຽງ',
    leg_office: 'ຫ້ອງການ', leg_land: 'ທີ່ດິນ',
    // DETAIL
    d_loc: 'ສະຖານທີ່', d_area: 'ເນື້ອທີ່', d_type: 'ປະເພດ',
    d_deed: 'ໂຉນ', d_desc: 'ລາຍລະອຽດ', d_con: 'ຕິດຕໍ່',
    d_call: 'ໂທ', d_enq: 'ສອບຖາມ',
    // FOOTER
    footer_copy: '© 2025 TERRA — ຕະຫຼາດທີ່ດິນ',
    footer_note: 'ທຸກລາຍຊື່ຜ່ານການກວດສອບ',
    loading: 'ກຳລັງໂຫຼດ…',
    empty_title: 'ບໍ່ພົບລາຍຊື່', empty_sub: 'ລອງປ່ຽນຕົວຄົ້ນຫາ.',
    status_available: 'ມີຂາຍ', status_reserved: 'ຈອງ', status_sold: 'ຂາຍແລ້ວ',
    n_plots: (n) => `${n} ໜ່ວຍ`
  },

  en: {
    nav_home: 'Home', nav_listings: 'Listings', nav_cat: 'Categories',
    nav_why: 'Why Us', nav_contact: 'Contact', nav_about: 'About',
    hero_eyebrow: '// Premium Land Marketplace',
    hero_title: 'Premium Land for Sale<br><i>at Great Value</i>',
    hero_sub: 'Curated, verified land across Laos. Direct contact with owners. No hidden fees.',
    hero_btn1: 'View Listings', hero_btn2: 'Contact Us',
    hs_plots: 'Land Plots', hs_prov: 'Provinces', hs_exp: 'Years Exp.',
    s_heading: '// Search Land',
    sf_loc: 'Location', sf_loc_ph: 'e.g. Vientiane, Savannakhet...',
    sf_price: 'Price Range', sf_size: 'Land Size', sf_type: 'Land Type',
    sf_all: 'All', s_btn: 'Search →',
    price_all: 'Any Price', price_1: '< ฿1M', price_5: '฿1M–5M',
    price_10: '฿5M–10M', price_99: '฿10M+',
    size_all: 'Any Size', size_s: '< 1 Rai', size_m: '1–5 Rai',
    size_l: '5–20 Rai', size_xl: '20+ Rai',
    t_agricultural: 'Agricultural', t_residential: 'Residential', t_commercial: 'Commercial',
    t_industrial: 'Industrial', t_forest: 'Forest',
    t_roadside: 'Roadside', t_investment: 'Investment',
    t_empty: 'Empty Land', t_other: 'Other',
    fl_tag: '// Featured Listings', fl_title: 'Available Land',
    fl_sub: 'Hand-picked quality land at the best prices on the market.',
    fl_more: 'View All Listings', fl_less: 'Show Less',
    card_view: 'View Details', price_l: 'Asking Price',
    badge_featured: 'Featured', badge_new: 'New',
    cat_tag: '// Land Categories', cat_title: 'Browse by Category',
    cat_empty: 'Empty Land', cat_agri: 'Agricultural Land',
    cat_road: 'Roadside Land', cat_inv: 'Investment Land',
    cat_plots: 'plots',
    why_tag: '// Why Choose Us', why_title: 'Trusted by Hundreds',
    why_sub: 'We are committed to giving every client the best land-buying experience.',
    why1_t: 'Verified Documents', why1_d: 'Every title deed is checked for authenticity before listing.',
    why2_t: 'Transparent Process', why2_d: 'Each step is clearly explained. No hidden fees or surprises.',
    why3_t: 'Professional Team', why3_d: 'Experienced consultants guide you from search to transfer.',
    why4_t: 'Best Market Prices', why4_d: 'Direct owner listings mean the most competitive prices.',
    why5_t: 'Full Land Reports', why5_d: 'Receive detailed reports with photos, surveys, and legal summaries.',
    why6_t: 'After-Sale Support', why6_d: 'We support you through the full transfer process.',
    hiw_tag: '// Process', hiw_title: 'How It Works',
    step1_t: 'Search', step1_d: 'Use our filters to find land that matches your location and budget.',
    step2_t: 'Visit', step2_d: 'Schedule a site visit with one of our land consultants.',
    step3_t: 'Verify', step3_d: 'Review all title deeds and documents with our legal team.',
    step4_t: 'Transfer', step4_d: 'Complete the official ownership transfer at the land department.',
    c_tag: '// Contact Us', c_title: 'We Are Here to Help',
    c_sub: 'Reach out for land information, site visits, or anything you need.',
    c_phone_l: 'Phone', c_chat: 'Start Live Chat',
    cf_name: 'Your Name', cf_email: 'Email Address',
    cf_phone: 'Phone Number', cf_interest: 'I am interested in',
    cf_msg: 'Message', cf_send: 'Send Message →',
    cfi_buy: 'Buying Land', cfi_sell: 'Selling Land', cfi_info: 'General Info',
    contact_sent: 'Message sent!', contact_err: 'Please fill in all required fields.',
    ab_tag: '// About TERRA', ab_title: 'Laos Leading Land Marketplace',
    ab_text: 'Founded in 2009, TERRA Land is trusted by hundreds of buyers and sellers across Laos. Our certified consultants provide end-to-end service — from search to ownership transfer.',
    ab_btn: 'Get In Touch →',
    an_years: 'Years', an_sold: 'Sold', an_happy: 'Satisfied',
    map_title: 'Our Locations', map_sub: 'Office and featured land plots',
    map_dir: 'Get Directions', map_sb: 'Nearby Listings',
    leg_office: 'Office', leg_land: 'Land Plot',
    d_loc: 'Location', d_area: 'Area', d_type: 'Type',
    d_deed: 'Title Deed', d_desc: 'Description', d_con: 'Contact',
    d_call: 'Call Now', d_enq: 'Enquire',
    footer_copy: '© 2025 TERRA — Land Marketplace',
    footer_note: 'All listings verified by our team',
    loading: 'Loading…',
    empty_title: 'No listings found', empty_sub: 'Try adjusting your search filters.',
    status_available: 'Available', status_reserved: 'Reserved', status_sold: 'Sold',
    n_plots: (n) => `${n} plot${n !== 1 ? 's' : ''}`
  },

  th: {
    nav_home: 'หน้าหลัก', nav_listings: 'รายการ', nav_cat: 'ประเภท',
    nav_why: 'ทำไมเรา', nav_contact: 'ติดต่อ', nav_about: 'เกี่ยวกับ',
    hero_eyebrow: '// ตลาดที่ดินพรีเมียม',
    hero_title: 'ที่ดินพรีเมียม<br><i>ราคาคุ้มค่า</i>',
    hero_sub: 'คัดสรรที่ดินคุณภาพทั่วลาว ตรวจสอบเอกสารครบถ้วน ติดต่อเจ้าของโดยตรง',
    hero_btn1: 'ดูรายการ', hero_btn2: 'ติดต่อเรา',
    hs_plots: 'แปลงที่ดิน', hs_prov: 'จังหวัด', hs_exp: 'ปีประสบการณ์',
    s_heading: '// ค้นหาที่ดิน',
    sf_loc: 'ที่ตั้ง', sf_loc_ph: 'เช่น เวียงจันทน์, สะหวัน...',
    sf_price: 'ช่วงราคา', sf_size: 'ขนาดที่ดิน', sf_type: 'ประเภทที่ดิน',
    sf_all: 'ทั้งหมด', s_btn: 'ค้นหา →',
    price_all: 'ทุกราคา', price_1: '< ฿1ล้าน', price_5: '฿1–5ล้าน',
    price_10: '฿5–10ล้าน', price_99: '฿10ล้าน+',
    size_all: 'ทุกขนาด', size_s: '< 1 ไร่', size_m: '1–5 ไร่',
    size_l: '5–20 ไร่', size_xl: '20+ ไร่',
    t_agricultural: 'เกษตรกรรม', t_residential: 'ที่อยู่อาศัย', t_commercial: 'พาณิชย์',
    t_industrial: 'อุตสาหกรรม', t_forest: 'ป่าไม้',
    t_roadside: 'ริมถนน', t_investment: 'การลงทุน',
    t_empty: 'ที่ดินเปล่า', t_other: 'อื่นๆ',
    fl_tag: '// รายการแนะนำ', fl_title: 'ที่ดินพร้อมขาย',
    fl_sub: 'ที่ดินคัดสรรคุณภาพในราคาที่ดีที่สุด',
    fl_more: 'ดูทั้งหมด', fl_less: 'ย่อลง',
    card_view: 'ดูรายละเอียด', price_l: 'ราคาเสนอขาย',
    badge_featured: 'แนะนำ', badge_new: 'ใหม่',
    cat_tag: '// ประเภทที่ดิน', cat_title: 'เลือกตามประเภท',
    cat_empty: 'ที่ดินเปล่า', cat_agri: 'ที่ดินเกษตร',
    cat_road: 'ที่ดินริมถนน', cat_inv: 'ที่ดินลงทุน',
    cat_plots: 'แปลง',
    why_tag: '// ทำไมต้องเลือกเรา', why_title: 'น่าเชื่อถือ',
    why_sub: 'เรามุ่งมั่นมอบประสบการณ์ที่ดีที่สุดให้ลูกค้าทุกท่าน',
    why1_t: 'เอกสารผ่านการตรวจสอบ', why1_d: 'โฉนดที่ดินทุกแปลงผ่านการตรวจสอบก่อนลงรายการ',
    why2_t: 'กระบวนการโปร่งใส', why2_d: 'ทุกขั้นตอนอธิบายชัดเจน ไม่มีค่าใช้จ่ายซ่อนเร้น',
    why3_t: 'ทีมงานมืออาชีพ', why3_d: 'ที่ปรึกษาที่มีประสบการณ์พร้อมดูแลตลอดกระบวนการ',
    why4_t: 'ราคาดีที่สุด', why4_d: 'รายการตรงจากเจ้าของ ไม่ผ่านนายหน้า',
    why5_t: 'รายงานที่ดินครบถ้วน', why5_d: 'รับรายงานละเอียดพร้อมรูปภาพและสรุปกฎหมาย',
    why6_t: 'บริการหลังการขาย', why6_d: 'สนับสนุนตลอดกระบวนการโอนกรรมสิทธิ์',
    hiw_tag: '// ขั้นตอน', hiw_title: 'วิธีการซื้อที่ดิน',
    step1_t: 'ค้นหา', step1_d: 'ใช้ตัวกรองค้นหาที่ดินตามทำเลและงบประมาณ',
    step2_t: 'นัดชม', step2_d: 'นัดหมายเพื่อไปชมที่ดินจริงกับที่ปรึกษาของเรา',
    step3_t: 'ตรวจสอบ', step3_d: 'ตรวจสอบโฉนดและเอกสารกับทีมกฎหมายของเรา',
    step4_t: 'โอน', step4_d: 'ดำเนินการโอนอย่างถูกต้องที่กรมที่ดิน',
    c_tag: '// ติดต่อ', c_title: 'เราพร้อมช่วยคุณ',
    c_sub: 'ติดต่อเพื่อขอข้อมูล นัดชม หรือสอบถามทุกเรื่อง',
    c_phone_l: 'โทรศัพท์', c_chat: 'แชทสด',
    cf_name: 'ชื่อของคุณ', cf_email: 'อีเมล',
    cf_phone: 'เบอร์โทร', cf_interest: 'สนใจ',
    cf_msg: 'ข้อความ', cf_send: 'ส่งข้อความ →',
    cfi_buy: 'ซื้อที่ดิน', cfi_sell: 'ขายที่ดิน', cfi_info: 'สอบถาม',
    contact_sent: 'ส่งข้อความแล้ว!', contact_err: 'กรุณากรอกข้อมูลที่จำเป็น',
    ab_tag: '// เกี่ยวกับ TERRA', ab_title: 'ผู้นำตลาดที่ดินลาว',
    ab_text: 'TERRA Land ก่อตั้งปี 2009 ให้บริการซื้อขายที่ดินทั่วลาวอย่างมืออาชีพ ด้วยทีมที่ปรึกษาที่มีใบรับรอง พร้อมดูแลตั้งแต่ค้นหาจนถึงโอนกรรมสิทธิ์',
    ab_btn: 'ติดต่อ →',
    an_years: 'ปี', an_sold: 'ขายแล้ว', an_happy: 'พึงพอใจ',
    map_title: 'สถานที่ของเรา', map_sub: 'สำนักงานและที่ดินที่มีจำหน่าย',
    map_dir: 'เส้นทาง', map_sb: 'ที่ดินใกล้เคียง',
    leg_office: 'สำนักงาน', leg_land: 'แปลงที่ดิน',
    d_loc: 'ที่ตั้ง', d_area: 'พื้นที่', d_type: 'ประเภท',
    d_deed: 'โฉนด', d_desc: 'รายละเอียด', d_con: 'ผู้ติดต่อ',
    d_call: 'โทร', d_enq: 'สอบถาม',
    footer_copy: '© 2025 TERRA — ตลาดที่ดิน',
    footer_note: 'ทุกรายการผ่านการตรวจสอบ',
    loading: 'กำลังโหลด…',
    empty_title: 'ไม่พบรายการ', empty_sub: 'ลองปรับตัวกรองการค้นหา',
    status_available: 'ว่างขาย', status_reserved: 'จองแล้ว', status_sold: 'ขายแล้ว',
    n_plots: (n) => `${n} แปลง`
  }
};

// ── Lang Manager ──
const Lang = (() => {
  let current = localStorage.getItem('terra_lang') || 'lo';

  function set(code) {
    current = code;
    localStorage.setItem('terra_lang', code);
    document.documentElement.lang = code;
    document.querySelectorAll('.lang-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === code));
    document.dispatchEvent(new CustomEvent('langchange', { detail: code }));
  }

  function get() { return current; }

  function t(key, ...args) {
    const dict = TRANSLATIONS[current] || TRANSLATIONS.en;
    const val  = dict[key] ?? TRANSLATIONS.en[key] ?? key;
    return typeof val === 'function' ? val(...args) : val;
  }

  // Apply all [data-i18n] elements
  function applyAll() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = t(key);
      if (el.dataset.i18nHtml !== undefined) el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPh);
    });
  }

  // Get multilang field value
  function field(obj, key) {
    if (!obj || !obj[key]) return '';
    return obj[key][current] || obj[key].en || obj[key].lo || obj[key].th || '';
  }

  return { set, get, t, applyAll, field };
})();

// ── Shared Helpers ──
function formatPrice(n) {
  return '฿' + Number(n).toLocaleString('en-US');
}

function showToast(msg, isError = false) {
  let el = document.getElementById('toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg;
  el.style.background = isError ? '#c0392b' : 'var(--ink)';
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3200);
}

function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  document.body.style.overflow = '';
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Init lang buttons ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => Lang.set(btn.dataset.lang));
    if (btn.dataset.lang === Lang.get()) btn.classList.add('active');
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape')
      document.querySelectorAll('.modal-overlay.open').forEach(o => closeModal(o.id));
  });
});
