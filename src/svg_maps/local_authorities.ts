import type { StringObject, SvgMap } from "../types";

export const PRETTY_NAMES: StringObject = {
  E92000001: "England",
  W92000004: "Wales",
  S92000003: "Scotland",
  N92000001: "Northern Ireland",
  E13000002: "Outer London",
  E13000001: "Inner London",
  S12000028: "South Ayrshire",
  S12000029: "South Lanarkshire",
  S12000030: "Stirling",
  S12000033: "City of Aberdeen",
  S12000034: "Aberdeenshire",
  E12000003: "Yorkshire and The Humber",
  E12000004: "East Midlands",
  E12000005: "West Midlands Region",
  E12000006: "East of England",
  E12000007: "London",
  E12000008: "South East",
  E12000009: "South West",
  S12000005: "Clackmannanshire",
  S12000006: "Dumfries and Galloway",
  S12000008: "East Ayrshire",
  S12000010: "East Lothian",
  S12000011: "East Renfrewshire",
  S12000013: "Na h-Eileanan Siar",
  S12000014: "Falkirk",
  S12000017: "Highland",
  S12000018: "Inverclyde",
  S12000019: "Midlothian",
  S12000020: "Moray",
  S12000021: "North Ayrshire",
  S12000035: "Argyll and Bute",
  S12000036: "City of Edinburgh",
  S12000038: "Renfrewshire",
  S12000039: "West Dunbartonshire",
  S12000040: "West Lothian",
  S12000041: "Angus",
  S12000042: "City of Dundee",
  S12000045: "East Dunbartonshire",
  S12000047: "Fife",
  S12000048: "Perth and Kinross",
  S12000049: "City of Glasgow",
  S12000050: "North Lanarkshire",
  E12000001: "North East",
  E12000002: "North West",
  S12000023: "Orkney Islands",
  S12000026: "Scottish Borders",
  S12000027: "Shetland Islands",
  E11000006: "West Yorkshire",
  E11000005: "West Midlands",
  E11000003: "South Yorkshire",
  E11000002: "Merseyside",
  E11000001: "Greater Manchester",
  E11000007: "Tyne and Wear",
  E10000014: "Hampshire",
  E10000015: "Hertfordshire",
  E10000016: "Kent",
  E10000017: "Lancashire",
  E10000018: "Leicestershire",
  E10000019: "Lincolnshire",
  E10000020: "Norfolk",
  E10000023: "North Yorkshire",
  E10000024: "Nottinghamshire",
  E10000025: "Oxfordshire",
  E10000027: "Somerset",
  E10000028: "Staffordshire",
  E10000029: "Suffolk",
  E10000030: "Surrey",
  E10000031: "Warwickshire",
  E10000032: "West Sussex",
  E10000034: "Worcestershire",
  E10000013: "Gloucestershire",
  E10000012: "Essex",
  E10000011: "East Sussex",
  E10000008: "Devon",
  E10000007: "Derbyshire",
  E10000003: "Cambridgeshire",
  E10000006: "Cumbria",
  E09000033: "City of Westminster",
  N09000001: "Antrim and Newtownabbey",
  N09000002: "Armagh City Banbridge and Craigavon",
  N09000003: "Belfast",
  N09000004: "Causeway Coast and Glens",
  N09000005: "Derry City and Strabane",
  N09000006: "Fermanagh and Omagh",
  N09000007: "Lisburn and Castlereagh",
  N09000008: "Mid and East Antrim",
  N09000009: "Mid Ulster",
  N09000010: "Newry Mourne and Down",
  N09000011: "Ards and North Down",
  E09000001: "City of London",
  E09000002: "Barking and Dagenham",
  E09000003: "Barnet",
  E09000004: "Bexley",
  E09000005: "Brent",
  E09000006: "Bromley",
  E09000007: "Camden",
  E09000008: "Croydon",
  E09000009: "Ealing",
  E09000010: "Enfield",
  E09000011: "Greenwich",
  E09000012: "Hackney",
  E09000013: "Hammersmith and Fulham",
  E09000014: "Haringey",
  E09000015: "Harrow",
  E09000016: "Havering",
  E09000017: "Hillingdon",
  E09000018: "Hounslow",
  E09000019: "Islington",
  E09000020: "Kensington and Chelsea",
  E09000021: "Kingston upon Thames",
  E09000022: "Lambeth",
  E09000023: "Lewisham",
  E09000024: "Merton",
  E09000025: "Newham",
  E09000026: "Redbridge",
  E09000027: "Richmond upon Thames",
  E09000028: "Southwark",
  E09000029: "Sutton",
  E09000030: "Tower Hamlets",
  E09000031: "Waltham Forest",
  E09000032: "Wandsworth",
  E08000001: "Bolton",
  E08000037: "Gateshead",
  E08000003: "Manchester",
  E08000004: "Oldham",
  E08000005: "Rochdale",
  E08000006: "Salford",
  E08000007: "Stockport",
  E08000008: "Tameside",
  E08000009: "Trafford",
  E08000010: "Wigan",
  E08000011: "Knowsley",
  E08000012: "Liverpool",
  E08000013: "St Helens",
  E08000014: "Sefton",
  E08000015: "Wirral",
  E08000016: "Barnsley",
  E08000017: "Doncaster",
  E08000018: "Rotherham",
  E08000019: "Sheffield",
  E08000021: "Newcastle upon Tyne",
  E08000022: "North Tyneside",
  E08000023: "South Tyneside",
  E08000024: "Sunderland",
  E08000025: "Birmingham",
  E08000026: "Coventry",
  E08000027: "Dudley",
  E08000028: "Sandwell",
  E08000029: "Solihull",
  E08000030: "Walsall",
  E08000031: "Wolverhampton",
  E08000032: "Bradford",
  E08000033: "Calderdale",
  E08000034: "Kirklees",
  E08000035: "Leeds",
  E08000036: "Wakefield",
  E08000002: "Bury",
  E07000008: "Cambridge",
  E07000009: "East Cambridgeshire",
  E07000071: "Colchester",
  E07000072: "Epping Forest",
  E07000073: "Harlow",
  E07000074: "Maldon",
  E07000075: "Rochford",
  E07000076: "Tendring",
  E07000077: "Uttlesford",
  E07000078: "Cheltenham",
  E07000079: "Cotswold",
  E07000080: "Forest of Dean",
  E07000081: "Gloucester",
  E07000082: "Stroud",
  E07000083: "Tewkesbury",
  E07000084: "Basingstoke and Deane",
  E07000085: "East Hampshire",
  E07000086: "Eastleigh",
  E07000087: "Fareham",
  E07000088: "Gosport",
  E07000089: "Hart",
  E07000090: "Havant",
  E07000091: "New Forest",
  E07000092: "Rushmoor",
  E07000093: "Test Valley",
  E07000094: "Winchester",
  E07000095: "Broxbourne",
  E07000010: "Fenland",
  E07000011: "Huntingdonshire",
  E07000012: "South Cambridgeshire",
  E07000026: "Allerdale",
  E07000027: "Barrow-in-Furness",
  E07000028: "Carlisle",
  E07000029: "Copeland",
  E07000030: "Eden",
  E07000031: "South Lakeland",
  E07000032: "Amber Valley",
  E07000033: "Bolsover",
  E07000034: "Chesterfield",
  E07000035: "Derbyshire Dales",
  E07000036: "Erewash",
  E07000037: "High Peak",
  E07000038: "North East Derbyshire",
  E07000039: "South Derbyshire",
  E07000040: "East Devon",
  E07000041: "Exeter",
  E07000042: "Mid Devon",
  E07000043: "North Devon",
  E07000044: "South Hams",
  E07000045: "Teignbridge",
  E07000046: "Torridge",
  E07000047: "West Devon",
  E07000061: "Eastbourne",
  E07000062: "Hastings",
  E07000063: "Lewes",
  E07000064: "Rother",
  E07000065: "Wealden",
  E07000066: "Basildon",
  E07000067: "Braintree",
  E07000068: "Brentwood",
  E07000069: "Castle Point",
  E07000070: "Chelmsford",
  E07000188: "Sedgemoor",
  E07000189: "South Somerset",
  E07000192: "Cannock Chase",
  E07000193: "East Staffordshire",
  E07000194: "Lichfield",
  E07000195: "Newcastle-under-Lyme",
  E07000196: "South Staffordshire",
  E07000197: "Stafford",
  E07000198: "Staffordshire Moorlands",
  E07000199: "Tamworth",
  E07000200: "Babergh",
  E07000202: "Ipswich",
  E07000203: "Mid Suffolk",
  E07000207: "Elmbridge",
  E07000208: "Epsom and Ewell",
  E07000209: "Guildford",
  E07000210: "Mole Valley",
  E07000211: "Reigate and Banstead",
  E07000212: "Runnymede",
  E07000213: "Spelthorne",
  E07000214: "Surrey Heath",
  E07000215: "Tandridge",
  E07000216: "Waverley",
  E07000217: "Woking",
  E07000218: "North Warwickshire",
  E07000219: "Nuneaton and Bedworth",
  E07000220: "Rugby",
  E07000221: "Stratford-on-Avon",
  E07000222: "Warwick",
  E07000096: "Dacorum",
  E07000098: "Hertsmere",
  E07000099: "North Hertfordshire",
  E07000102: "Three Rivers",
  E07000103: "Watford",
  E07000105: "Ashford",
  E07000106: "Canterbury",
  E07000107: "Dartford",
  E07000108: "Dover",
  E07000109: "Gravesham",
  E07000110: "Maidstone",
  E07000111: "Sevenoaks",
  E07000112: "Folkestone and Hythe",
  E07000113: "Swale",
  E07000114: "Thanet",
  E07000115: "Tonbridge and Malling",
  E07000116: "Tunbridge Wells",
  E07000117: "Burnley",
  E07000118: "Chorley",
  E07000119: "Fylde",
  E07000120: "Hyndburn",
  E07000121: "Lancaster",
  E07000122: "Pendle",
  E07000123: "Preston",
  E07000124: "Ribble Valley",
  E07000125: "Rossendale",
  E07000126: "South Ribble",
  E07000127: "West Lancashire",
  E07000128: "Wyre",
  E07000129: "Blaby",
  E07000130: "Charnwood",
  E07000131: "Harborough",
  E07000132: "Hinckley and Bosworth",
  E07000133: "Melton",
  E07000134: "North West Leicestershire",
  E07000135: "Oadby and Wigston",
  E07000136: "Boston",
  E07000137: "East Lindsey",
  E07000138: "Lincoln",
  E07000139: "North Kesteven",
  E07000140: "South Holland",
  E07000141: "South Kesteven",
  E07000142: "West Lindsey",
  E07000143: "Breckland",
  E07000144: "Broadland",
  E07000145: "Great Yarmouth",
  E07000146: "King's Lynn and West Norfolk ",
  E07000147: "North Norfolk",
  E07000148: "Norwich",
  E07000149: "South Norfolk",
  E07000163: "Craven",
  E07000164: "Hambleton",
  E07000165: "Harrogate",
  E07000166: "Richmondshire",
  E07000167: "Ryedale",
  E07000168: "Scarborough",
  E07000169: "Selby",
  E07000170: "Ashfield",
  E07000171: "Bassetlaw",
  E07000172: "Broxtowe",
  E07000173: "Gedling",
  E07000174: "Mansfield",
  E07000175: "Newark and Sherwood",
  E07000176: "Rushcliffe",
  E07000177: "Cherwell",
  E07000178: "Oxford",
  E07000179: "South Oxfordshire",
  E07000180: "Vale of White Horse",
  E07000181: "West Oxfordshire",
  E07000187: "Mendip",
  E07000223: "Adur",
  E07000224: "Arun",
  E07000225: "Chichester",
  E07000226: "Crawley",
  E07000227: "Horsham",
  E07000228: "Mid Sussex",
  E07000229: "Worthing",
  E07000234: "Bromsgrove",
  E07000235: "Malvern Hills",
  E07000236: "Redditch",
  E07000237: "Worcester",
  E07000238: "Wychavon",
  E07000239: "Wyre Forest",
  E07000240: "St Albans",
  E07000241: "Welwyn Hatfield",
  E07000242: "East Hertfordshire",
  E07000243: "Stevenage",
  E07000244: "East Suffolk",
  E07000245: "West Suffolk",
  E07000246: "Somerset West and Taunton",
  E06000013: "North Lincolnshire",
  E06000014: "York",
  E06000015: "City of Derby",
  E06000016: "Leicester",
  E06000017: "Rutland",
  E06000018: "City of Nottingham",
  E06000019: "Herefordshire",
  E06000020: "Telford and Wrekin",
  E06000021: "Stoke-on-Trent",
  E06000022: "Bath and North East Somerset",
  E06000023: "City of Bristol",
  E06000024: "North Somerset",
  E06000025: "South Gloucestershire",
  E06000026: "City of Plymouth",
  E06000027: "Torbay",
  E06000030: "Swindon",
  W06000001: "Isle of Anglesey",
  W06000002: "Gwynedd",
  W06000003: "Conwy",
  W06000004: "Denbighshire",
  W06000005: "Flintshire",
  W06000006: "Wrexham",
  W06000008: "Ceredigion",
  W06000009: "Pembrokeshire",
  W06000010: "Carmarthenshire",
  W06000011: "Swansea",
  W06000012: "Neath Port Talbot",
  W06000013: "Bridgend",
  W06000014: "Vale of Glamorgan",
  W06000015: "Cardiff",
  W06000016: "Rhondda Cynon Taf",
  W06000018: "Caerphilly",
  W06000019: "Blaenau Gwent",
  W06000020: "Torfaen",
  W06000021: "Monmouthshire",
  W06000022: "Newport",
  W06000023: "Powys",
  W06000024: "Merthyr Tydfil",
  E06000031: "City of Peterborough",
  E06000032: "Luton",
  E06000033: "Southend-on-Sea",
  E06000034: "Thurrock",
  E06000035: "Medway",
  E06000036: "Bracknell Forest",
  E06000037: "West Berkshire",
  E06000038: "Reading",
  E06000039: "Slough",
  E06000040: "Windsor and Maidenhead",
  E06000041: "Wokingham",
  E06000042: "Milton Keynes",
  E06000043: "Brighton and Hove",
  E06000044: "Portsmouth",
  E06000045: "Southampton",
  E06000046: "Isle of Wight",
  E06000047: "County Durham",
  E06000049: "Cheshire East",
  E06000050: "Cheshire West and Chester",
  E06000051: "Shropshire",
  E06000052: "Cornwall",
  E06000054: "Wiltshire",
  E06000055: "Bedford",
  E06000056: "Central Bedfordshire",
  E06000057: "Northumberland",
  E06000058: "Bournemouth Christchurch and Poole",
  E06000059: "Dorset",
  E06000060: "Buckinghamshire",
  E06000061: "North Northamptonshire",
  E06000062: "West Northamptonshire",
  E06000001: "Hartlepool",
  E06000002: "Middlesbrough",
  E06000003: "Redcar and Cleveland",
  E06000004: "Stockton-on-Tees",
  E06000005: "Darlington",
  E06000006: "Halton",
  E06000007: "Warrington",
  E06000008: "Blackburn with Darwen",
  E06000009: "Blackpool",
  E06000010: "City of Kingston upon Hull",
  E06000011: "East Riding of Yorkshire",
  E06000012: "North East Lincolnshire",
  K04000001: "England and Wales",
  K03000001: "Great Britain",
  K02000001: "United Kingdom",
  E07000150: "Corby",
  E07000151: "Daventry",
  E07000152: "East Northamptonshire",
  E07000153: "Kettering",
  E07000154: "Northampton",
  E07000155: "South Northamptonshire",
  E07000156: "Wellingborough",
  E07000004: "Aylesbury Vale",
  E07000005: "Chiltern",
  E07000006: "South Bucks",
  E07000007: "Wycombe",
  S12000024: "Perth and Kinross",
  S12000015: "Fife",
  S12000044: "North Lanarkshire",
  S12000046: "Glasgow City",
  E07000201: "Forest Heath",
  E07000204: "St Edmundsbury",
  E07000206: "Waveney",
  E07000205: "Suffolk Coastal",
  E07000052: "West Dorset",
  E07000051: "Purbeck",
  E07000049: "East Dorset",
  E07000050: "North Dorset",
  E06000029: "Poole",
  E06000028: "Bournemouth",
  E07000048: "Christchurch",
  E07000190: "Taunton Deane",
  E07000191: "West Somerset",
};

export const LocalAuthoritiesSvgMap: SvgMap = {
  svgPaths: {
    default: "./data/svg/uk_local_2021.svg",
    2016: "./data/svg/uk_local_2016.svg",
    2017: "./data/svg/uk_local_2017.svg",
    2018: "./data/svg/uk_local_2018.svg",
    2019: "./data/svg/uk_local_2019.svg",
    2020: "./data/svg/uk_local_2020.svg",
    2021: "./data/svg/uk_local_2021.svg",
    2022: "./data/svg/uk_local_2022.svg",
  },
  prettyNames: PRETTY_NAMES,
};
