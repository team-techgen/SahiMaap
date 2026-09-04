/* =========================================================
   SAHIMAAP - INSTRUMENT REGISTRATION
   FRONTEND ONLY
   ========================================================= */


/* =========================================================
   1. MANUFACTURER SESSION CHECK
========================================================= */

const manufacturerSession =
    sessionStorage.getItem("currentManufacturer");

if (!manufacturerSession) {
    window.location.replace("login.html");
}


/* =========================================================
   2. DOM ELEMENTS
========================================================= */

const registrationForm =
    document.getElementById("instrumentRegistrationForm");

const instrumentType =
    document.getElementById("instrumentType");

const instrumentCategory =
    document.getElementById("instrumentCategory");

const categoryInformation =
    document.getElementById("categoryInformation");

const countryOfManufacture =
    document.getElementById("countryOfManufacture");

const manufacturingState =
    document.getElementById("manufacturingState");

const manufacturingDistrict =
    document.getElementById("manufacturingDistrict");

const manufacturingStateGroup =
    document.getElementById("manufacturingStateGroup");

const manufacturingDistrictGroup =
    document.getElementById("manufacturingDistrictGroup");

const typeApprovalRequired =
    document.getElementById("typeApprovalRequired");

const approvalDetails =
    document.getElementById("approvalDetails");

const calibrationCertificateAvailable =
    document.getElementById("calibrationCertificateAvailable");

const calibrationDetails =
    document.getElementById("calibrationDetails");

const weighingSpecifications =
    document.getElementById("weighingSpecifications");

const measuringSpecifications =
    document.getElementById("measuringSpecifications");

const backButton =
    document.getElementById("backButton");

const submitInstrumentButton =
    document.getElementById("submitInstrumentButton");


/* =========================================================
   3. INSTRUMENT CATEGORIES
========================================================= */

const instrumentCategories = {

    weighing: [
        "Automatic Weighing Instrument",
        "Non-Automatic Weighing Instrument",
        "Weighbridge / Weighing Bridge",
        "Platform Weighing Machine",
        "Table Top Weighing Machine",
        "Counter Weighing Machine",
        "Commercial Weighing Machine",
        "Retail Weighing Machine",
        "Industrial Weighing Machine",
        "Crane Weighing Machine",
        "Hanging Weighing Machine",
        "Baby Weighing Machine",
        "Person Weighing Machine",
        "Price Computing Weighing Instrument",
        "Label Printing Weighing Instrument",
        "Jewellery Weighing Machine",
        "Precision / Laboratory Weighing Instrument",
        "Spring Balance",
        "Beam Scale",
        "Mechanical Weighing Machine",
        "Electronic Weighing Machine",
        "Other"
    ],

    measuring: [
        "Length Measuring Instrument",
        "Volume Measuring Instrument",
        "Capacity Measuring Instrument",
        "Dispensing Measuring Instrument",
        "Fuel Measuring Instrument",
        "Flow Measuring Instrument",
        "Other"
    ],

    "weighing-measuring": [
        "Weighing and Measuring Machine",
        "Retail Weighing & Measuring Instrument",
        "Integrated Weighing & Measuring Instrument",
        "Other"
    ],

    other: [
        "Other"
    ]

};


/* =========================================================
   4. STATE → DISTRICT DATA
========================================================= */

const districtsByState = {

    "Andhra Pradesh": [
        "Alluri Sitharama Raju",
        "Anakapalli",
        "Ananthapuramu",
        "Annamayya",
        "Bapatla",
        "Chittoor",
        "Dr. B. R. Ambedkar Konaseema",
        "East Godavari",
        "Eluru",
        "Guntur",
        "Kakinada",
        "Krishna",
        "Kurnool",
        "Nandyal",
        "NTR",
        "Palnadu",
        "Parvathipuram Manyam",
        "Prakasam",
        "Srikakulam",
        "Sri Potti Sriramulu Nellore",
        "Sri Sathya Sai",
        "Tirupati",
        "Visakhapatnam",
        "Vizianagaram",
        "West Godavari",
        "YSR Kadapa"
    ],

    "Arunachal Pradesh": [
        "Anjaw",
        "Bajali",
        "Changlang",
        "Dibang Valley",
        "East Kameng",
        "East Siang",
        "Itanagar Capital Complex",
        "Kamle",
        "Kra Daadi",
        "Kurung Kumey",
        "Lepa Rada",
        "Lohit",
        "Longding",
        "Lower Dibang Valley",
        "Lower Siang",
        "Lower Subansiri",
        "Namsai",
        "Pakke-Kessang",
        "Papum Pare",
        "Shi Yomi",
        "Siang",
        "Tawang",
        "Tirap",
        "Upper Siang",
        "Upper Subansiri",
        "West Kameng",
        "West Siang"
    ],

    "Assam": [
        "Baksa",
        "Barpeta",
        "Biswanath",
        "Bongaigaon",
        "Cachar",
        "Charaideo",
        "Chirang",
        "Darrang",
        "Dhemaji",
        "Dhubri",
        "Dibrugarh",
        "Dima Hasao",
        "Goalpara",
        "Golaghat",
        "Hailakandi",
        "Hojai",
        "Jorhat",
        "Kamrup",
        "Kamrup Metropolitan",
        "Karbi Anglong",
        "Karimganj",
        "Kokrajhar",
        "Lakhimpur",
        "Majuli",
        "Morigaon",
        "Nagaon",
        "Nalbari",
        "Sivasagar",
        "Sonitpur",
        "South Salmara-Mankachar",
        "Tamulpur",
        "Tinsukia",
        "Udalguri",
        "West Karbi Anglong"
    ],

    "Bihar": [
        "Araria",
        "Arwal",
        "Aurangabad",
        "Banka",
        "Begusarai",
        "Bhagalpur",
        "Bhojpur",
        "Buxar",
        "Darbhanga",
        "East Champaran",
        "Gaya",
        "Gopalganj",
        "Jamui",
        "Jehanabad",
        "Kaimur",
        "Katihar",
        "Khagaria",
        "Kishanganj",
        "Lakhisarai",
        "Madhepura",
        "Madhubani",
        "Munger",
        "Muzaffarpur",
        "Nalanda",
        "Nawada",
        "Patna",
        "Purnia",
        "Rohtas",
        "Saharsa",
        "Samastipur",
        "Saran",
        "Sheikhpura",
        "Sheohar",
        "Sitamarhi",
        "Siwan",
        "Supaul",
        "Vaishali",
        "West Champaran"
    ],

    "Chhattisgarh": [
        "Balod",
        "Baloda Bazar",
        "Balrampur-Ramanujganj",
        "Bastar",
        "Bemetara",
        "Bijapur",
        "Bilaspur",
        "Dantewada",
        "Dhamtari",
        "Durg",
        "Gariaband",
        "Gaurela-Pendra-Marwahi",
        "Janjgir-Champa",
        "Jashpur",
        "Kabirdham",
        "Kanker",
        "Khairagarh-Chhuikhadan-Gandai",
        "Kondagaon",
        "Korba",
        "Korea",
        "Mahasamund",
        "Manendragarh-Chirmiri-Bharatpur",
        "Mohla-Manpur-Ambagarh Chowki",
        "Mungeli",
        "Narayanpur",
        "Raigarh",
        "Raipur",
        "Rajnandgaon",
        "Sarangarh-Bilaigarh",
        "Sukma",
        "Surajpur",
        "Surguja"
    ],

    "Goa": [
        "North Goa",
        "South Goa"
    ],

    "Gujarat": [
        "Ahmedabad",
        "Amreli",
        "Anand",
        "Aravalli",
        "Banaskantha",
        "Bharuch",
        "Bhavnagar",
        "Botad",
        "Chhota Udaipur",
        "Dahod",
        "Dang",
        "Devbhoomi Dwarka",
        "Gandhinagar",
        "Gir Somnath",
        "Jamnagar",
        "Junagadh",
        "Kheda",
        "Kutch",
        "Mahisagar",
        "Mehsana",
        "Morbi",
        "Narmada",
        "Navsari",
        "Panchmahal",
        "Patan",
        "Porbandar",
        "Rajkot",
        "Sabarkantha",
        "Surat",
        "Surendranagar",
        "Tapi",
        "Vadodara",
        "Valsad"
    ],

    "Haryana": [
        "Ambala",
        "Bhiwani",
        "Charkhi Dadri",
        "Faridabad",
        "Fatehabad",
        "Gurugram",
        "Hisar",
        "Jhajjar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Kurukshetra",
        "Mahendragarh",
        "Nuh",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Rewari",
        "Rohtak",
        "Sirsa",
        "Sonipat",
        "Yamunanagar"
    ],

    "Himachal Pradesh": [
        "Bilaspur",
        "Chamba",
        "Hamirpur",
        "Kangra",
        "Kinnaur",
        "Kullu",
        "Lahaul and Spiti",
        "Mandi",
        "Shimla",
        "Sirmaur",
        "Solan",
        "Una"
    ],

    "Jharkhand": [
        "Bokaro",
        "Chatra",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "East Singhbhum",
        "Garhwa",
        "Giridih",
        "Godda",
        "Gumla",
        "Hazaribagh",
        "Jamtara",
        "Khunti",
        "Koderma",
        "Latehar",
        "Lohardaga",
        "Pakur",
        "Palamu",
        "Ramgarh",
        "Ranchi",
        "Sahebganj",
        "Seraikela-Kharsawan",
        "Simdega",
        "West Singhbhum"
    ],

    "Karnataka": [
        "Bagalkot",
        "Ballari",
        "Belagavi",
        "Bengaluru Rural",
        "Bengaluru Urban",
        "Bidar",
        "Chamarajanagar",
        "Chikkaballapur",
        "Chikkamagaluru",
        "Chitradurga",
        "Dakshina Kannada",
        "Davanagere",
        "Dharwad",
        "Gadag",
        "Hassan",
        "Haveri",
        "Kalaburagi",
        "Kodagu",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mysuru",
        "Raichur",
        "Ramanagara",
        "Shivamogga",
        "Tumakuru",
        "Udupi",
        "Uttara Kannada",
        "Vijayapura",
        "Yadgir"
    ],

    "Kerala": [
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad"
    ],

    "Madhya Pradesh": [
        "Agar Malwa",
        "Alirajpur",
        "Anuppur",
        "Ashoknagar",
        "Balaghat",
        "Barwani",
        "Betul",
        "Bhind",
        "Bhopal",
        "Burhanpur",
        "Chhatarpur",
        "Chhindwara",
        "Damoh",
        "Datia",
        "Dewas",
        "Dhar",
        "Dindori",
        "Guna",
        "Gwalior",
        "Harda",
        "Indore",
        "Jabalpur",
        "Jhabua",
        "Katni",
        "Khandwa",
        "Khargone",
        "Maihar",
        "Mandla",
        "Mandsaur",
        "Mauganj",
        "Morena",
        "Narmadapuram",
        "Narsinghpur",
        "Neemuch",
        "Niwari",
        "Panna",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rewa",
        "Sagar",
        "Satna",
        "Sehore",
        "Seoni",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Shivpuri",
        "Sidhi",
        "Singrauli",
        "Tikamgarh",
        "Ujjain",
        "Umaria",
        "Vidisha"
    ],

    "Maharashtra": [
        "Ahmednagar",
        "Akola",
        "Amravati",
        "Aurangabad",
        "Beed",
        "Bhandara",
        "Buldhana",
        "Chandrapur",
        "Dhule",
        "Gadchiroli",
        "Gondia",
        "Hingoli",
        "Jalgaon",
        "Jalna",
        "Kolhapur",
        "Latur",
        "Mumbai City",
        "Mumbai Suburban",
        "Nagpur",
        "Nanded",
        "Nandurbar",
        "Nashik",
        "Osmanabad",
        "Palghar",
        "Parbhani",
        "Pune",
        "Raigad",
        "Ratnagiri",
        "Sangli",
        "Satara",
        "Sindhudurg",
        "Solapur",
        "Thane",
        "Wardha",
        "Washim",
        "Yavatmal"
    ],

    "Manipur": [
        "Bishnupur",
        "Chandel",
        "Churachandpur",
        "Imphal East",
        "Imphal West",
        "Jiribam",
        "Kakching",
        "Kamjong",
        "Kangpokpi",
        "Noney",
        "Pherzawl",
        "Senapati",
        "Tamenglong",
        "Tengnoupal",
        "Thoubal",
        "Ukhrul"
    ],

    "Meghalaya": [
        "East Garo Hills",
        "East Jaintia Hills",
        "East Khasi Hills",
        "Eastern West Khasi Hills",
        "North Garo Hills",
        "Ri-Bhoi",
        "South Garo Hills",
        "South West Garo Hills",
        "South West Khasi Hills",
        "West Garo Hills",
        "West Jaintia Hills",
        "West Khasi Hills"
    ],

    "Mizoram": [
        "Aizawl",
        "Champhai",
        "Hnahthial",
        "Khawzawl",
        "Kolasib",
        "Lawngtlai",
        "Lunglei",
        "Mamit",
        "Saitual",
        "Serchhip"
    ],

    "Nagaland": [
        "Chumoukedima",
        "Dimapur",
        "Kiphire",
        "Kohima",
        "Longleng",
        "Mokokchung",
        "Mon",
        "Niuland",
        "Noklak",
        "Peren",
        "Phek",
        "Shamator",
        "Tuensang",
        "Tseminyu",
        "Wokha",
        "Zunheboto"
    ],

    "Odisha": [
        "Angul",
        "Balangir",
        "Balasore",
        "Bargarh",
        "Bhadrak",
        "Boudh",
        "Cuttack",
        "Deogarh",
        "Dhenkanal",
        "Gajapati",
        "Ganjam",
        "Jagatsinghpur",
        "Jajpur",
        "Jharsuguda",
        "Kalahandi",
        "Kandhamal",
        "Kendrapara",
        "Kendujhar",
        "Khordha",
        "Koraput",
        "Malkangiri",
        "Mayurbhanj",
        "Nabarangpur",
        "Nayagarh",
        "Nuapada",
        "Puri",
        "Rayagada",
        "Sambalpur",
        "Subarnapur",
        "Sundargarh"
    ],

    "Punjab": [
        "Amritsar",
        "Barnala",
        "Bathinda",
        "Faridkot",
        "Fatehgarh Sahib",
        "Fazilka",
        "Ferozepur",
        "Gurdaspur",
        "Hoshiarpur",
        "Jalandhar",
        "Kapurthala",
        "Ludhiana",
        "Malerkotla",
        "Mansa",
        "Moga",
        "Pathankot",
        "Patiala",
        "Rupnagar",
        "Sahibzada Ajit Singh Nagar",
        "Sangrur",
        "Shaheed Bhagat Singh Nagar",
        "Sri Muktsar Sahib",
        "Tarn Taran"
    ],

    "Rajasthan": [
        "Ajmer",
        "Alwar",
        "Anupgarh",
        "Balotra",
        "Banswara",
        "Baran",
        "Barmer",
        "Beawar",
        "Bharatpur",
        "Bhilwara",
        "Bikaner",
        "Bundi",
        "Chittorgarh",
        "Churu",
        "Dausa",
        "Deeg",
        "Dholpur",
        "Didwana-Kuchamana",
        "Dudu",
        "Dungarpur",
        "Ganganagar",
        "Gangapur City",
        "Hanumangarh",
        "Jaipur",
        "Jaisalmer",
        "Jalore",
        "Jhalawar",
        "Jhunjhunu",
        "Jodhpur",
        "Karauli",
        "Kekri",
        "Khairthal-Tijara",
        "Kota",
        "Kotputli-Behror",
        "Nagaur",
        "Neem Ka Thana",
        "Pali",
        "Phalodi",
        "Pratapgarh",
        "Rajsamand",
        "Salumbar",
        "Sawai Madhopur",
        "Sikar",
        "Sirohi",
        "Tonk",
        "Udaipur"
    ],

    "Sikkim": [
        "Gangtok",
        "Gyalshing",
        "Mangan",
        "Namchi",
        "Pakyong",
        "Soreng"
    ],

    "Tamil Nadu": [
        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kancheepuram",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Mayiladuthurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivaganga",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thoothukudi",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar"
    ],

    "Telangana": [
        "Adilabad",
        "Bhadradri Kothagudem",
        "Hanamkonda",
        "Hyderabad",
        "Jagtial",
        "Jangaon",
        "Jayashankar Bhupalpally",
        "Jogulamba Gadwal",
        "Kamareddy",
        "Karimnagar",
        "Khammam",
        "Komaram Bheem Asifabad",
        "Mahabubabad",
        "Mahbubnagar",
        "Mancherial",
        "Medak",
        "Medchal-Malkajgiri",
        "Mulugu",
        "Nagarkurnool",
        "Nalgonda",
        "Narayanpet",
        "Nirmal",
        "Nizamabad",
        "Peddapalli",
        "Rajanna Sircilla",
        "Rangareddy",
        "Sangareddy",
        "Siddipet",
        "Suryapet",
        "Vikarabad",
        "Wanaparthy",
        "Warangal",
        "Yadadri Bhuvanagiri"
    ],

    "Tripura": [
        "Dhalai",
        "Gomati",
        "Khowai",
        "North Tripura",
        "Sepahijala",
        "South Tripura",
        "Unakoti",
        "West Tripura"
    ],

    "Uttar Pradesh": [
        "Agra",
        "Aligarh",
        "Ambedkar Nagar",
        "Amethi",
        "Amroha",
        "Auraiya",
        "Ayodhya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bhadohi",
        "Bijnor",
        "Budaun",
        "Bulandshahr",
        "Chandauli",
        "Chitrakoot",
        "Deoria",
        "Etah",
        "Etawah",
        "Farrukhabad",
        "Fatehpur",
        "Firozabad",
        "Gautam Buddha Nagar",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hamirpur",
        "Hapur",
        "Hardoi",
        "Hathras",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kanpur Dehat",
        "Kanpur Nagar",
        "Kasganj",
        "Kaushambi",
        "Kushinagar",
        "Lakhimpur Kheri",
        "Lalitpur",
        "Lucknow",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Mathura",
        "Mau",
        "Meerut",
        "Mirzapur",
        "Moradabad",
        "Muzaffarnagar",
        "Pilibhit",
        "Pratapgarh",
        "Prayagraj",
        "Raebareli",
        "Rampur",
        "Saharanpur",
        "Sambhal",
        "Sant Kabir Nagar",
        "Shahjahanpur",
        "Shamli",
        "Shravasti",
        "Siddharthnagar",
        "Sitapur",
        "Sonbhadra",
        "Sultanpur",
        "Unnao",
        "Varanasi"
    ],

    "Uttarakhand": [
        "Almora",
        "Bageshwar",
        "Chamoli",
        "Champawat",
        "Dehradun",
        "Haridwar",
        "Nainital",
        "Pauri Garhwal",
        "Pithoragarh",
        "Rudraprayag",
        "Tehri Garhwal",
        "Udham Singh Nagar",
        "Uttarkashi"
    ],

    "West Bengal": [
        "Alipurduar",
        "Bankura",
        "Paschim Bardhaman",
        "Purba Bardhaman",
        "Birbhum",
        "Cooch Behar",
        "Dakshin Dinajpur",
        "Darjeeling",
        "Hooghly",
        "Howrah",
        "Jalpaiguri",
        "Jhargram",
        "Kalimpong",
        "Kolkata",
        "Maldah",
        "Murshidabad",
        "Nadia",
        "North 24 Parganas",
        "South 24 Parganas",
        "Paschim Medinipur",
        "Purba Medinipur",
        "Uttar Dinajpur"
    ],

    "Andaman and Nicobar Islands": [
        "Nicobar",
        "North and Middle Andaman",
        "South Andaman"
    ],

    "Chandigarh": [
        "Chandigarh"
    ],

    "Dadra and Nagar Haveli and Daman and Diu": [
        "Dadra and Nagar Haveli",
        "Daman",
        "Diu"
    ],

    "Delhi": [
        "Central Delhi",
        "East Delhi",
        "New Delhi",
        "North Delhi",
        "North East Delhi",
        "North West Delhi",
        "Shahdara",
        "South Delhi",
        "South East Delhi",
        "South West Delhi",
        "West Delhi"
    ],

    "Jammu and Kashmir": [
        "Anantnag",
        "Bandipora",
        "Baramulla",
        "Budgam",
        "Doda",
        "Ganderbal",
        "Jammu",
        "Kathua",
        "Kishtwar",
        "Kulgam",
        "Kupwara",
        "Poonch",
        "Pulwama",
        "Rajouri",
        "Ramban",
        "Reasi",
        "Samba",
        "Shopian",
        "Srinagar",
        "Udhampur"
    ],

    "Ladakh": [
        "Kargil",
        "Leh"
    ],

    "Lakshadweep": [
        "Agatti",
        "Amini",
        "Andrott",
        "Bitra",
        "Chetlat",
        "Kadmat",
        "Kalpeni",
        "Kavaratti",
        "Kiltan",
        "Minicoy"
    ],

    "Puducherry": [
        "Karaikal",
        "Mahe",
        "Puducherry",
        "Yanam"
    ]

};


/* =========================================================
   5. INITIALIZE PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializePage();

});


function initializePage() {

    setDefaultDate();

    handleCountryChange();

    handleInstrumentTypeChange();

    handleStateChange();

    handleTypeApprovalChange();

    handleCalibrationChange();

    updateSpecificSpecifications();

    setupFileValidation();

    setupReviewUpdates();

    setupBackButton();

    setupFormSubmission();

}


/* =========================================================
   6. DEFAULT DECLARATION DATE
========================================================= */

function setDefaultDate() {

    const declarationDate =
        document.getElementById("declarationDate");

    if (!declarationDate) {
        return;
    }

    const today =
        new Date().toISOString().split("T")[0];

    declarationDate.value = today;

}


/* =========================================================
   7. INSTRUMENT TYPE → CATEGORY
========================================================= */

function handleInstrumentTypeChange() {

    if (!instrumentType) {
        return;
    }

    instrumentType.addEventListener("change", function () {

        const selectedType =
            instrumentType.value;

        instrumentCategory.innerHTML = "";

        if (!selectedType ||
            !instrumentCategories[selectedType]) {

            instrumentCategory.disabled = true;

            instrumentCategory.innerHTML = `
                <option value="">
                    Select Instrument Type First
                </option>
            `;

            updateSpecificSpecifications();

            return;
        }


        instrumentCategory.disabled = false;

        const defaultOption =
            document.createElement("option");

        defaultOption.value = "";
        defaultOption.textContent =
            "Select Instrument Category";

        instrumentCategory.appendChild(defaultOption);


        instrumentCategories[selectedType].forEach(function (category) {

            const option =
                document.createElement("option");

            option.value = category;
            option.textContent = category;

            instrumentCategory.appendChild(option);

        });


        categoryInformation.innerHTML = `
            <p>
                Select the specific instrument category from the
                list above. Additional specifications will be shown
                according to the selected instrument type.
            </p>
        `;


        updateSpecificSpecifications();

    });


    instrumentCategory.addEventListener("change", function () {

        updateSpecificSpecifications();

    });

}


/* =========================================================
   8. INSTRUMENT-SPECIFIC SPECIFICATIONS
========================================================= */

function updateSpecificSpecifications() {

    if (!instrumentType ||
        !weighingSpecifications ||
        !measuringSpecifications) {

        return;
    }

    const selectedType =
        instrumentType.value;


    weighingSpecifications.style.display = "none";
    measuringSpecifications.style.display = "none";


    if (selectedType === "weighing") {

        weighingSpecifications.style.display = "block";

        setSpecificRequiredFields(
            weighingSpecifications,
            true
        );

        setSpecificRequiredFields(
            measuringSpecifications,
            false
        );

    }

    else if (selectedType === "measuring") {

        measuringSpecifications.style.display = "block";

        setSpecificRequiredFields(
            measuringSpecifications,
            true
        );

        setSpecificRequiredFields(
            weighingSpecifications,
            false
        );

    }

    else if (selectedType === "weighing-measuring") {

        weighingSpecifications.style.display = "block";
        measuringSpecifications.style.display = "block";

        setSpecificRequiredFields(
            weighingSpecifications,
            true
        );

        setSpecificRequiredFields(
            measuringSpecifications,
            true
        );

    }

    else {

        setSpecificRequiredFields(
            weighingSpecifications,
            false
        );

        setSpecificRequiredFields(
            measuringSpecifications,
            false
        );

    }

}


/* =========================================================
   9. REQUIRED FIELDS FOR SPECIFIC SECTIONS
========================================================= */

function setSpecificRequiredFields(
    container,
    required
) {

    if (!container) {
        return;
    }


    const requiredIds = [

        "weighingMaximumCapacity",
        "weighingMinimumCapacity",
        "verificationScaleInterval",
        "actualScaleInterval",
        "weighingUnit",
        "weighingAccuracyClass",
        "verificationIntervals",

        "measuringRange",
        "maximumMeasurement",
        "measuringScaleInterval",
        "measuringAccuracy"

    ];


    requiredIds.forEach(function (id) {

        const field =
            document.getElementById(id);

        if (!field) {
            return;
        }

        if (container.contains(field)) {
            field.required = required;
        }

    });

}


/* =========================================================
   10. COUNTRY → STATE / DISTRICT
========================================================= */

function handleCountryChange() {

    if (!countryOfManufacture) {
        return;
    }


    countryOfManufacture.addEventListener(
        "change",
        function () {

            if (countryOfManufacture.value === "India") {

                showIndianLocationFields();

            }

            else {

                hideIndianLocationFields();

            }

        }
    );


    if (countryOfManufacture.value === "India") {
        showIndianLocationFields();
    }

    else {
        hideIndianLocationFields();
    }

}


function showIndianLocationFields() {

    manufacturingStateGroup.style.display = "";
    manufacturingDistrictGroup.style.display = "";

    manufacturingState.required = true;
    manufacturingDistrict.required = true;

}


function hideIndianLocationFields() {

    manufacturingStateGroup.style.display = "none";
    manufacturingDistrictGroup.style.display = "none";

    manufacturingState.required = false;
    manufacturingDistrict.required = false;

    manufacturingState.value = "";

    manufacturingDistrict.innerHTML = `
        <option value="">
            Select State First
        </option>
    `;

}


/* =========================================================
   11. STATE → DISTRICT
========================================================= */

function handleStateChange() {

    if (!manufacturingState) {
        return;
    }


    manufacturingState.addEventListener(
        "change",
        function () {

            const selectedState =
                manufacturingState.value;

            manufacturingDistrict.innerHTML = "";


            if (!selectedState) {

                manufacturingDistrict.innerHTML = `
                    <option value="">
                        Select State First
                    </option>
                `;

                manufacturingDistrict.disabled = true;

                return;
            }


            const districts =
                districtsByState[selectedState] || [];


            const defaultOption =
                document.createElement("option");

            defaultOption.value = "";
            defaultOption.textContent =
                "Select District";

            manufacturingDistrict.appendChild(
                defaultOption
            );


            districts.forEach(function (district) {

                const option =
                    document.createElement("option");

                option.value = district;
                option.textContent = district;

                manufacturingDistrict.appendChild(
                    option
                );

            });


            manufacturingDistrict.disabled = false;

        }
    );


    manufacturingDistrict.disabled = true;

}


/* =========================================================
   12. TYPE APPROVAL CONDITIONAL FIELDS
========================================================= */

function handleTypeApprovalChange() {

    if (!typeApprovalRequired) {
        return;
    }


    typeApprovalRequired.addEventListener(
        "change",
        function () {

            if (typeApprovalRequired.value === "Yes") {

                showApprovalDetails();

            }

            else {

                hideApprovalDetails();

            }

        }
    );


    hideApprovalDetails();

}


function showApprovalDetails() {

    approvalDetails.style.display = "block";

    const fields = [
        "typeApprovalNumber",
        "typeApprovalDate",
        "typeApprovalValidUntil",
        "approvalIssuingAuthority",
        "certificateNumber"
    ];

    fields.forEach(function (id) {

        const field =
            document.getElementById(id);

        if (field) {
            field.required = true;
        }

    });

}


function hideApprovalDetails() {

    approvalDetails.style.display = "none";

    const fields = [
        "typeApprovalNumber",
        "typeApprovalDate",
        "typeApprovalValidUntil",
        "approvalIssuingAuthority",
        "certificateNumber"
    ];

    fields.forEach(function (id) {

        const field =
            document.getElementById(id);

        if (field) {

            field.required = false;
            field.value = "";

        }

    });

}


/* =========================================================
   13. CALIBRATION CONDITIONAL FIELDS
========================================================= */

function handleCalibrationChange() {

    if (!calibrationCertificateAvailable) {
        return;
    }


    calibrationCertificateAvailable.addEventListener(
        "change",
        function () {

            if (
                calibrationCertificateAvailable.value === "Yes"
            ) {

                showCalibrationDetails();

            }

            else {

                hideCalibrationDetails();

            }

        }
    );


    hideCalibrationDetails();

}


function showCalibrationDetails() {

    calibrationDetails.style.display = "block";

    const fields = [
        "calibrationCertificateNumber",
        "calibrationDate",
        "calibrationValidUntil",
        "calibratedBy"
    ];

    fields.forEach(function (id) {

        const field =
            document.getElementById(id);

        if (field) {
            field.required = true;
        }

    });

}


function hideCalibrationDetails() {

    calibrationDetails.style.display = "none";

    const fields = [
        "calibrationCertificateNumber",
        "calibrationDate",
        "calibrationValidUntil",
        "calibratedBy"
    ];

    fields.forEach(function (id) {

        const field =
            document.getElementById(id);

        if (field) {

            field.required = false;
            field.value = "";

        }

    });

}


/* =========================================================
   14. FILE VALIDATION
========================================================= */

function setupFileValidation() {

    const imageInputs =
        document.querySelectorAll(
            '#instrument-images input[type="file"]'
        );

    const documentInputs =
        document.querySelectorAll(
            '#supporting-documents input[type="file"]'
        );


    imageInputs.forEach(function (input) {

        input.addEventListener(
            "change",
            function () {

                validateFile(
                    input,
                    [
                        "image/jpeg",
                        "image/png"
                    ],
                    5
                );

            }
        );

    });


    documentInputs.forEach(function (input) {

        input.addEventListener(
            "change",
            function () {

                validateFile(
                    input,
                    [
                        "application/pdf",
                        "image/jpeg",
                        "image/png"
                    ],
                    10
                );

            }
        );

    });

}


function validateFile(
    input,
    allowedTypes,
    maxSizeMB
) {

    clearFieldError(input);


    if (!input.files ||
        input.files.length === 0) {

        return true;

    }


    const file =
        input.files[0];


    const maxSize =
        maxSizeMB * 1024 * 1024;


    const extension =
        file.name
            .split(".")
            .pop()
            .toLowerCase();


    const allowedExtensions =
        maxSizeMB === 5
            ? ["jpg", "jpeg", "png"]
            : ["pdf", "jpg", "jpeg", "png"];


    if (!allowedExtensions.includes(extension)) {

        showFieldError(
            input,
            `Invalid file format. Allowed formats: ${
                allowedExtensions.join(", ").toUpperCase()
            }.`
        );

        input.value = "";

        return false;

    }


    if (file.size > maxSize) {

        showFieldError(
            input,
            `File size must not exceed ${maxSizeMB} MB.`
        );

        input.value = "";

        return false;

    }


    return true;

}


/* =========================================================
   15. REVIEW UPDATE
========================================================= */

function setupReviewUpdates() {

    if (!registrationForm) {
        return;
    }


    registrationForm.addEventListener(
        "input",
        updateReview
    );


    registrationForm.addEventListener(
        "change",
        updateReview
    );


    updateReview();

}


function updateReview() {

    setReviewValue(
        "reviewInstrumentType",
        getSelectedText("instrumentType")
    );

    setReviewValue(
        "reviewInstrumentCategory",
        getSelectedText("instrumentCategory")
    );

    setReviewValue(
        "reviewInstrumentName",
        getValue("instrumentName")
    );

    setReviewValue(
        "reviewBrand",
        getValue("brandName")
    );

    setReviewValue(
        "reviewModelNumber",
        getValue("modelNumber")
    );

    setReviewValue(
        "reviewSerialNumber",
        getValue("serialNumber")
    );

    setReviewValue(
        "reviewManufacturingDate",
        formatDate(
            getValue("manufacturingDate")
        )
    );


    setReviewValue(
        "reviewMaximumCapacity",
        getValue("maximumCapacityRange")
    );

    setReviewValue(
        "reviewMinimumCapacity",
        getValue("minimumCapacityRange")
    );

    setReviewValue(
        "reviewAccuracy",
        combineValueAndUnit(
            "technicalAccuracy",
            "accuracyUnit"
        )
    );

    setReviewValue(
        "reviewDivision",
        combineValueAndUnit(
            "divisionScaleInterval",
            "divisionUnit"
        )
    );

    setReviewValue(
        "reviewAccuracyClass",
        getSelectedText("accuracyClass")
    );

    setReviewValue(
        "reviewMeasurementTechnology",
        getSelectedText("measurementTechnology")
    );


    setReviewValue(
        "reviewLegalMetrology",
        getSelectedText("legalMetrologyApplicable")
    );

    setReviewValue(
        "reviewTypeApproval",
        getSelectedText("typeApprovalRequired")
    );

    setReviewValue(
        "reviewApprovalNumber",
        getValue("typeApprovalNumber")
    );

    setReviewValue(
        "reviewApplicableStandard",
        getSelectedText("applicableStandard")
    );


    updateReviewFile(
        "productSpecificationSheet",
        "reviewProductSpecification"
    );

    updateReviewFile(
        "manufacturerDeclaration",
        "reviewManufacturerDeclaration"
    );

    updateReviewFile(
        "typeApprovalCertificate",
        "reviewTypeApprovalCertificate"
    );

    updateReviewFile(
        "frontImage",
        "reviewFrontImage"
    );

    updateReviewFile(
        "nameplateImage",
        "reviewNameplateImage"
    );

    updateReviewFile(
        "serialNumberImage",
        "reviewSerialNumberImage"
    );

}


/* =========================================================
   16. REVIEW HELPER FUNCTIONS
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return "—";
    }

    return element.value.trim() || "—";

}


function getSelectedText(id) {

    const element =
        document.getElementById(id);

    if (!element ||
        element.selectedIndex < 0) {

        return "—";

    }

    return element.value
        ? element.options[element.selectedIndex].text
        : "—";

}


function combineValueAndUnit(
    valueId,
    unitId
) {

    const value =
        getValue(valueId);

    const unit =
        getSelectedText(unitId);


    if (value === "—") {
        return "—";
    }

    if (unit === "—") {
        return value;
    }

    return `${value} ${unit}`;

}


function setReviewValue(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    element.textContent =
        value || "—";

}


function formatDate(dateValue) {

    if (!dateValue) {
        return "—";
    }


    const parts =
        dateValue.split("-");


    if (parts.length !== 3) {
        return dateValue;
    }


    return `${parts[2]}/${parts[1]}/${parts[0]}`;

}


function updateReviewFile(
    inputId,
    reviewId
) {

    const input =
        document.getElementById(inputId);

    const reviewElement =
        document.getElementById(reviewId);


    if (!input ||
        !reviewElement) {

        return;
    }


    if (input.files &&
        input.files.length > 0) {

        reviewElement.textContent =
            `✓ ${getReviewFileLabel(reviewId)}`;

        reviewElement.classList.add(
            "file-present"
        );

    }

    else {

        reviewElement.textContent =
            `✗ ${getReviewFileLabel(reviewId)}`;

        reviewElement.classList.remove(
            "file-present"
        );

    }

}


function getReviewFileLabel(id) {

    const labels = {

        reviewProductSpecification:
            "Product Specification Sheet",

        reviewManufacturerDeclaration:
            "Manufacturer Declaration",

        reviewTypeApprovalCertificate:
            "Type Approval Certificate",

        reviewFrontImage:
            "Front Image",

        reviewNameplateImage:
            "Nameplate Image",

        reviewSerialNumberImage:
            "Serial Number Image"

    };


    return labels[id] || "File";

}


/* =========================================================
   17. BACK BUTTON
========================================================= */

function setupBackButton() {

    if (!backButton) {
        return;
    }


    backButton.addEventListener(
        "click",
        function () {

            window.history.back();

        }
    );

}


/* =========================================================
   18. FORM SUBMISSION
========================================================= */

function setupFormSubmission() {

    if (!registrationForm) {
        return;
    }


    registrationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            clearAllErrors();


            if (!validateForm()) {

                showFormMessage(
                    "Please complete all required fields and correct the highlighted errors.",
                    "error"
                );

                scrollToFirstError();

                return;

            }


            showFormMessage(
                "All required information has been completed successfully. The instrument registration is ready for submission.",
                "success"
            );


            const reviewSection =
                document.getElementById(
                    "review-submit"
                );

            if (reviewSection) {

                reviewSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


/* =========================================================
   19. FORM VALIDATION
========================================================= */

function validateForm() {

    let isValid = true;


    const requiredFields =
        registrationForm.querySelectorAll(
            "input[required], select[required], textarea[required]"
        );


    requiredFields.forEach(function (field) {

        if (field.disabled) {
            return;
        }


        if (field.type === "checkbox") {

            if (!field.checked) {

                markFieldError(
                    field,
                    "This field is required."
                );

                isValid = false;

            }

            return;

        }


        if (field.type === "file") {

            if (!field.files ||
                field.files.length === 0) {

                markFieldError(
                    field,
                    "Please upload the required file."
                );

                isValid = false;

            }

            return;

        }


        if (!field.value.trim()) {

            markFieldError(
                field,
                "This field is required."
            );

            isValid = false;

        }

    });


    const imageInputs =
        document.querySelectorAll(
            '#instrument-images input[type="file"]'
        );


    imageInputs.forEach(function (input) {

        if (
            input.files &&
            input.files.length > 0
        ) {

            const valid =
                validateFile(
                    input,
                    [
                        "image/jpeg",
                        "image/png"
                    ],
                    5
                );

            if (!valid) {
                isValid = false;
            }

        }

    });


    const documentInputs =
        document.querySelectorAll(
            '#supporting-documents input[type="file"]'
        );


    documentInputs.forEach(function (input) {

        if (
            input.files &&
            input.files.length > 0
        ) {

            const valid =
                validateFile(
                    input,
                    [
                        "application/pdf",
                        "image/jpeg",
                        "image/png"
                    ],
                    10
                );

            if (!valid) {
                isValid = false;
            }

        }

    });


    return isValid;

}


/* =========================================================
   20. FIELD ERROR FUNCTIONS
========================================================= */

function markFieldError(
    field,
    message
) {

    field.classList.add("input-error");


    const existingError =
        field.parentElement.querySelector(
            ".field-error"
        );


    if (existingError) {
        existingError.remove();
    }


    const error =
        document.createElement("span");

    error.className = "field-error";
    error.textContent = message;


    field.parentElement.appendChild(error);

}


function showFieldError(
    field,
    message
) {

    markFieldError(
        field,
        message
    );

}


function clearFieldError(field) {

    field.classList.remove(
        "input-error"
    );


    const error =
        field.parentElement.querySelector(
            ".field-error"
        );


    if (error) {
        error.remove();
    }

}


function clearAllErrors() {

    const fields =
        registrationForm.querySelectorAll(
            ".input-error"
        );


    fields.forEach(function (field) {

        field.classList.remove(
            "input-error"
        );

    });


    const errors =
        registrationForm.querySelectorAll(
            ".field-error"
        );


    errors.forEach(function (error) {

        error.remove();

    });

}


/* =========================================================
   21. FORM MESSAGE
========================================================= */

function showFormMessage(
    message,
    type
) {

    let messageBox =
        document.getElementById(
            "formMessage"
        );


    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.id =
            "formMessage";

        messageBox.className =
            "form-message";


        registrationForm.prepend(
            messageBox
        );

    }


    messageBox.className =
        `form-message ${type}`;

    messageBox.textContent =
        message;


    messageBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================================
   22. SCROLL TO FIRST ERROR
========================================================= */

function scrollToFirstError() {

    const firstError =
        registrationForm.querySelector(
            ".input-error"
        );


    if (!firstError) {
        return;
    }


    firstError.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    setTimeout(function () {

        firstError.focus();

    }, 400);

}


/* =========================================================
   23. CLEAR ERROR WHEN USER CORRECTS FIELD
========================================================= */

if (registrationForm) {

    registrationForm.addEventListener(
        "input",
        function (event) {

            if (
                event.target.matches(
                    "input, select, textarea"
                )
            ) {

                if (
                    event.target.value ||
                    event.target.checked ||
                    (
                        event.target.files &&
                        event.target.files.length > 0
                    )
                ) {

                    clearFieldError(
                        event.target
                    );

                }

            }

        }
    );


    registrationForm.addEventListener(
        "change",
        function (event) {

            if (
                event.target.matches(
                    "input, select, textarea"
                )
            ) {

                if (
                    event.target.value ||
                    event.target.checked ||
                    (
                        event.target.files &&
                        event.target.files.length > 0
                    )
                ) {

                    clearFieldError(
                        event.target
                    );

                }

            }

        }
    );

}


/* =========================================================
   END OF INSTRUMENT REGISTRATION JS
========================================================= */