/* ============================================================
   МИС — Медицинская информационная система
   Единый файл: данные + логика
   ============================================================ */

/* ============================================================
   ДАННЫЕ
   ============================================================ */

const patients = [
  { id:"P-001", firstName:"Иван", lastName:"Петров", fullName:"Петров Иван Сергеевич", birthDate:"1985-03-12", gender:"male", phone:"+7-900-100-10-01", email:"petrov@example.com", address:"г. Москва, ул. Ленина, д. 12", status:"active", insurance:"ОМС-1234567890", bloodType:"A+", allergies:["пенициллин"], emergencyContact:{name:"Петрова Анна",phone:"+7-900-200-20-01",relation:"Супруга"}, createdAt:"2023-01-15T10:00:00Z", notes:"Постоянный пациент" },
  { id:"P-002", firstName:"Мария", lastName:"Сидорова", fullName:"Сидорова Мария Ивановна", birthDate:"1990-07-22", gender:"female", phone:"+7-900-100-10-02", email:"sidorova@example.com", address:"г. Санкт-Петербург, Невский пр., 45", status:"active", insurance:"ОМС-2234567890", bloodType:"B-", allergies:[], emergencyContact:{name:"Сидоров Пётр",phone:"+7-900-200-20-02",relation:"Отец"}, createdAt:"2023-02-20T11:30:00Z", notes:"" },
  { id:"P-003", firstName:"Алексей", lastName:"Кузнецов", fullName:"Кузнецов Алексей Петрович", birthDate:"1978-11-05", gender:"male", phone:"+7-900-100-10-03", email:"kuznetsov@example.com", address:"г. Казань, ул. Баумана, 7", status:"observation", insurance:"ОМС-3234567890", bloodType:"O+", allergies:["аспирин"], emergencyContact:{name:"Кузнецова Ольга",phone:"+7-900-200-20-03",relation:"Супруга"}, createdAt:"2023-03-10T09:15:00Z", notes:"Гипертония" },
  { id:"P-004", firstName:"Елена", lastName:"Морозова", fullName:"Морозова Елена Владимировна", birthDate:"1995-05-18", gender:"female", phone:"+7-900-100-10-04", email:"morozova@example.com", address:"г. Екатеринбург, ул. Мира, 33", status:"active", insurance:"ОМС-4234567890", bloodType:"AB+", allergies:[], emergencyContact:{name:"Морозов Андрей",phone:"+7-900-200-20-04",relation:"Муж"}, createdAt:"2023-04-05T14:00:00Z", notes:"" },
  { id:"P-005", firstName:"Дмитрий", lastName:"Волков", fullName:"Волков Дмитрий Олегович", birthDate:"1982-09-30", gender:"male", phone:"+7-900-100-10-05", email:"volkov@example.com", address:"г. Новосибирск, ул. Гоголя, 15", status:"discharged", insurance:"ОМС-5234567890", bloodType:"A-", allergies:["латекс"], emergencyContact:{name:"Волкова Ирина",phone:"+7-900-200-20-05",relation:"Мать"}, createdAt:"2023-05-12T08:45:00Z", notes:"Выписан" },
  { id:"P-006", firstName:"Ольга", lastName:"Соколова", fullName:"Соколова Ольга Николаевна", birthDate:"1988-12-14", gender:"female", phone:"+7-900-100-10-06", email:"sokolova@example.com", address:"г. Нижний Новгород, ул. Горького, 22", status:"active", insurance:"ОМС-6234567890", bloodType:"B+", allergies:[], emergencyContact:{name:"Соколов Игорь",phone:"+7-900-200-20-06",relation:"Муж"}, createdAt:"2023-06-18T16:20:00Z", notes:"" },
  { id:"P-007", firstName:"Сергей", lastName:"Лебедев", fullName:"Лебедев Сергей Андреевич", birthDate:"1975-04-08", gender:"male", phone:"+7-900-100-10-07", email:"lebedev@example.com", address:"г. Самара, ул. Победы, 8", status:"observation", insurance:"ОМС-7234567890", bloodType:"O-", allergies:["сульфаниламиды"], emergencyContact:{name:"Лебедева Наталья",phone:"+7-900-200-20-07",relation:"Супруга"}, createdAt:"2023-07-22T12:10:00Z", notes:"Диабет 2 типа" },
  { id:"P-008", firstName:"Анна", lastName:"Новикова", fullName:"Новикова Анна Дмитриевна", birthDate:"1998-08-25", gender:"female", phone:"+7-900-100-10-08", email:"novikova@example.com", address:"г. Ростов-на-Дону, ул. Садовая, 50", status:"active", insurance:"ОМС-8234567890", bloodType:"A+", allergies:[], emergencyContact:{name:"Новиков Дмитрий",phone:"+7-900-200-20-08",relation:"Отец"}, createdAt:"2023-08-30T13:40:00Z", notes:"" },
  { id:"P-009", firstName:"Николай", lastName:"Фёдоров", fullName:"Фёдоров Николай Игоревич", birthDate:"1969-02-17", gender:"male", phone:"+7-900-100-10-09", email:"fedorov@example.com", address:"г. Уфа, ул. Ленина, 90", status:"observation", insurance:"ОМС-9234567890", bloodType:"AB-", allergies:["йод"], emergencyContact:{name:"Фёдорова Татьяна",phone:"+7-900-200-20-09",relation:"Супруга"}, createdAt:"2023-09-14T10:55:00Z", notes:"ХБП" },
  { id:"P-010", firstName:"Татьяна", lastName:"Егорова", fullName:"Егорова Татьяна Сергеевна", birthDate:"1993-06-11", gender:"female", phone:"+7-900-100-10-10", email:"egorova@example.com", address:"г. Краснодар, ул. Красная, 18", status:"active", insurance:"ОМС-1034567890", bloodType:"O+", allergies:[], emergencyContact:{name:"Егоров Павел",phone:"+7-900-200-20-10",relation:"Брат"}, createdAt:"2023-10-20T15:25:00Z", notes:"" },
  { id:"P-011", firstName:"Павел", lastName:"Козлов", fullName:"Козлов Павел Викторович", birthDate:"1987-01-29", gender:"male", phone:"+7-900-100-10-11", email:"kozlov@example.com", address:"г. Пермь, ул. Мира, 44", status:"active", insurance:"ОМС-1134567890", bloodType:"B+", allergies:[], emergencyContact:{name:"Козлова Екатерина",phone:"+7-900-200-20-11",relation:"Супруга"}, createdAt:"2023-11-08T09:30:00Z", notes:"" },
  { id:"P-012", firstName:"Юлия", lastName:"Степанова", fullName:"Степанова Юлия Андреевна", birthDate:"2000-10-03", gender:"female", phone:"+7-900-100-10-12", email:"stepanova@example.com", address:"г. Волгоград, пр. Ленина, 60", status:"active", insurance:"ОМС-1234567891", bloodType:"A-", allergies:["пыльца"], emergencyContact:{name:"Степанов Андрей",phone:"+7-900-200-20-12",relation:"Отец"}, createdAt:"2023-12-01T11:00:00Z", notes:"" },
  { id:"P-013", firstName:"Артём", lastName:"Орлов", fullName:"Орлов Артём Максимович", birthDate:"1980-07-19", gender:"male", phone:"+7-900-100-10-13", email:"orlov@example.com", address:"г. Челябинск, ул. Кирова, 5", status:"observation", insurance:"ОМС-1334567890", bloodType:"O+", allergies:[], emergencyContact:{name:"Орлова Светлана",phone:"+7-900-200-20-13",relation:"Супруга"}, createdAt:"2024-01-15T14:20:00Z", notes:"Аритмия" },
  { id:"P-014", firstName:"Светлана", lastName:"Романова", fullName:"Романова Светлана Петровна", birthDate:"1972-03-27", gender:"female", phone:"+7-900-100-10-14", email:"romanova@example.com", address:"г. Воронеж, ул. Плехановская, 12", status:"discharged", insurance:"ОМС-1434567890", bloodType:"B-", allergies:["новокаин"], emergencyContact:{name:"Романов Виктор",phone:"+7-900-200-20-14",relation:"Муж"}, createdAt:"2024-02-10T10:10:00Z", notes:"Выписана" },
  { id:"P-015", firstName:"Максим", lastName:"Григорьев", fullName:"Григорьев Максим Олегович", birthDate:"1991-11-23", gender:"male", phone:"+7-900-100-10-15", email:"grigorev@example.com", address:"г. Тюмень, ул. Республики, 88", status:"active", insurance:"ОМС-1534567890", bloodType:"AB+", allergies:[], emergencyContact:{name:"Григорьева Мария",phone:"+7-900-200-20-15",relation:"Мать"}, createdAt:"2024-03-05T16:45:00Z", notes:"" }
];

const appointments = [
  { id:"A-001", patientId:"P-001", patientName:"Петров И.С.", doctorName:"Ковалёв А.П.", specialty:"Терапевт", date:"2024-04-10T09:00:00Z", duration:30, room:"101", status:"completed", reason:"Плановый осмотр", notes:"", diagnoses:["D-001"], prescriptions:["R-001"], vitals:{pressure:"120/80",pulse:72,temperature:36.6}, createdAt:"2024-04-01T10:00:00Z" },
  { id:"A-002", patientId:"P-002", patientName:"Сидорова М.И.", doctorName:"Никитина Е.В.", specialty:"Кардиолог", date:"2024-04-11T10:30:00Z", duration:45, room:"202", status:"completed", reason:"Боль в груди", notes:"Назначено ЭКГ", diagnoses:["D-002"], prescriptions:["R-002","R-003"], vitals:{pressure:"130/85",pulse:88,temperature:36.7}, createdAt:"2024-04-02T11:00:00Z" },
  { id:"A-003", patientId:"P-003", patientName:"Кузнецов А.П.", doctorName:"Ковалёв А.П.", specialty:"Терапевт", date:"2024-04-12T11:00:00Z", duration:30, room:"101", status:"completed", reason:"Контроль давления", notes:"", diagnoses:["D-003"], prescriptions:["R-004"], vitals:{pressure:"150/90",pulse:82,temperature:36.5}, createdAt:"2024-04-03T09:00:00Z" },
  { id:"A-004", patientId:"P-004", patientName:"Морозова Е.В.", doctorName:"Смирнова О.Л.", specialty:"Невролог", date:"2024-04-15T14:00:00Z", duration:40, room:"305", status:"scheduled", reason:"Головные боли", notes:"", diagnoses:[], prescriptions:[], vitals:null, createdAt:"2024-04-05T15:00:00Z" },
  { id:"A-005", patientId:"P-005", patientName:"Волков Д.О.", doctorName:"Петрова Н.С.", specialty:"Хирург", date:"2024-04-16T08:30:00Z", duration:60, room:"401", status:"scheduled", reason:"Послеоперационный осмотр", notes:"", diagnoses:[], prescriptions:[], vitals:null, createdAt:"2024-04-06T10:00:00Z" },
  { id:"A-006", patientId:"P-006", patientName:"Соколова О.Н.", doctorName:"Ковалёв А.П.", specialty:"Терапевт", date:"2024-04-17T09:30:00Z", duration:30, room:"101", status:"scheduled", reason:"Профосмотр", notes:"", diagnoses:[], prescriptions:[], vitals:null, createdAt:"2024-04-07T11:00:00Z" },
  { id:"A-007", patientId:"P-007", patientName:"Лебедев С.А.", doctorName:"Иванов Д.М.", specialty:"Эндокринолог", date:"2024-04-18T15:00:00Z", duration:40, room:"210", status:"scheduled", reason:"Контроль диабета", notes:"", diagnoses:[], prescriptions:[], vitals:null, createdAt:"2024-04-08T12:00:00Z" },
  { id:"A-008", patientId:"P-008", patientName:"Новикова А.Д.", doctorName:"Смирнова О.Л.", specialty:"Невролог", date:"2024-04-19T11:30:00Z", duration:45, room:"305", status:"scheduled", reason:"Мигрень", notes:"", diagnoses:[], prescriptions:[], vitals:null, createdAt:"2024-04-09T13:00:00Z" },
  { id:"A-009", patientId:"P-009", patientName:"Фёдоров Н.И.", doctorName:"Иванов Д.М.", specialty:"Нефролог", date:"2024-04-20T10:00:00Z", duration:50, room:"215", status:"scheduled", reason:"Контроль почек", notes:"", diagnoses:[], prescriptions:[], vitals:null, createdAt:"2024-04-10T09:00:00Z" },
  { id:"A-010", patientId:"P-010", patientName:"Егорова Т.С.", doctorName:"Никитина Е.В.", specialty:"Кардиолог", date:"2024-04-21T14:30:00Z", duration:40, room:"202", status:"scheduled", reason:"Профосмотр", notes:"", diagnoses:[], prescriptions:[], vitals:null, createdAt:"2024-04-11T10:00:00Z" },
  { id:"A-011", patientId:"P-011", patientName:"Козлов П.В.", doctorName:"Ковалёв А.П.", specialty:"Терапевт", date:"2024-04-22T09:00:00Z", duration:30, room:"101", status:"scheduled", reason:"ОРВИ", notes:"", diagnoses:[], prescriptions:[], vitals:null, createdAt:"2024-04-12T11:00:00Z" },
  { id:"A-012", patientId:"P-012", patientName:"Степанова Ю.А.", doctorName:"Смирнова О.Л.", specialty:"Аллерголог", date:"2024-04-23T13:00:00Z", duration:45, room:"308", status:"scheduled", reason:"Аллергия", notes:"", diagnoses:[], prescriptions:[], vitals:null, createdAt:"2024-04-13T12:00:00Z" },
  { id:"A-013", patientId:"P-013", patientName:"Орлов А.М.", doctorName:"Никитина Е.В.", specialty:"Кардиолог", date:"2024-04-24T10:30:00Z", duration:40, room:"202", status:"scheduled", reason:"Аритмия", notes:"", diagnoses:[], prescriptions:[], vitals:null, createdAt:"2024-04-14T09:00:00Z" },
  { id:"A-014", patientId:"P-014", patientName:"Романова С.П.", doctorName:"Петрова Н.С.", specialty:"Хирург", date:"2024-04-25T08:00:00Z", duration:30, room:"401", status:"completed", reason:"Контрольный осмотр", notes:"Заживление хорошее", diagnoses:["D-004"], prescriptions:[], vitals:{pressure:"125/82",pulse:74,temperature:36.6}, createdAt:"2024-04-15T10:00:00Z" },
  { id:"A-015", patientId:"P-015", patientName:"Григорьев М.О.", doctorName:"Ковалёв А.П.", specialty:"Терапевт", date:"2024-04-26T11:00:00Z", duration:30, room:"101", status:"completed", reason:"Плановый осмотр", notes:"Здоров", diagnoses:["D-005"], prescriptions:[], vitals:{pressure:"118/78",pulse:68,temperature:36.5}, createdAt:"2024-04-16T12:00:00Z" }
];

const diagnoses = [
  { id:"D-001", patientId:"P-001", patientName:"Петров И.С.", code:"Z00.0", title:"Общий медицинский осмотр", description:"Профилактический осмотр", severity:"mild", status:"resolved", diagnosedAt:"2024-04-10T09:30:00Z", doctorName:"Ковалёв А.П.", symptoms:[], treatmentPlan:"Осмотр через год", icdGroup:"Z00-Z13" },
  { id:"D-002", patientId:"P-002", patientName:"Сидорова М.И.", code:"I20.9", title:"Стенокардия", description:"Боль в груди при нагрузке", severity:"moderate", status:"active", diagnosedAt:"2024-04-11T11:00:00Z", doctorName:"Никитина Е.В.", symptoms:["боль в груди","одышка"], treatmentPlan:"Нитраты", icdGroup:"I00-I99" },
  { id:"D-003", patientId:"P-003", patientName:"Кузнецов А.П.", code:"I10", title:"Эссенциальная гипертензия", description:"Повышенное АД", severity:"moderate", status:"active", diagnosedAt:"2024-04-12T11:15:00Z", doctorName:"Ковалёв А.П.", symptoms:["головная боль"], treatmentPlan:"ИАПФ", icdGroup:"I00-I99" },
  { id:"D-004", patientId:"P-014", patientName:"Романова С.П.", code:"Z98.8", title:"Послеоперационное состояние", description:"Состояние после операции", severity:"mild", status:"resolved", diagnosedAt:"2024-04-25T08:30:00Z", doctorName:"Петрова Н.С.", symptoms:[], treatmentPlan:"Наблюдение", icdGroup:"Z80-Z99" },
  { id:"D-005", patientId:"P-015", patientName:"Григорьев М.О.", code:"Z00.1", title:"Осмотр здорового", description:"Здоров", severity:"mild", status:"resolved", diagnosedAt:"2024-04-26T11:15:00Z", doctorName:"Ковалёв А.П.", symptoms:[], treatmentPlan:"", icdGroup:"Z00-Z13" },
  { id:"D-006", patientId:"P-007", patientName:"Лебедев С.А.", code:"E11.9", title:"Сахарный диабет 2 типа", description:"Инсулинонезависимый", severity:"moderate", status:"active", diagnosedAt:"2024-03-15T10:00:00Z", doctorName:"Иванов Д.М.", symptoms:["жажда","утомляемость"], treatmentPlan:"Метформин", icdGroup:"E00-E90" },
  { id:"D-007", patientId:"P-009", patientName:"Фёдоров Н.И.", code:"N18.3", title:"Хроническая болезнь почек", description:"3 стадия", severity:"severe", status:"active", diagnosedAt:"2024-02-20T14:00:00Z", doctorName:"Иванов Д.М.", symptoms:["отёки"], treatmentPlan:"Нефропротекция", icdGroup:"N00-N99" },
  { id:"D-008", patientId:"P-013", patientName:"Орлов А.М.", code:"I49.9", title:"Нарушение ритма", description:"Экстрасистолия", severity:"moderate", status:"active", diagnosedAt:"2024-01-20T15:00:00Z", doctorName:"Никитина Е.В.", symptoms:["перебои"], treatmentPlan:"Антиаритмики", icdGroup:"I00-I99" },
  { id:"D-009", patientId:"P-012", patientName:"Степанова Ю.А.", code:"J30.2", title:"Сезонный аллергический ринит", description:"Аллергия на пыльцу", severity:"mild", status:"active", diagnosedAt:"2024-04-01T10:00:00Z", doctorName:"Смирнова О.Л.", symptoms:["насморк","чихание"], treatmentPlan:"Антигистаминные", icdGroup:"J00-J99" },
  { id:"D-010", patientId:"P-008", patientName:"Новикова А.Д.", code:"G43.9", title:"Мигрень", description:"Интенсивные головные боли", severity:"moderate", status:"active", diagnosedAt:"2024-03-25T11:30:00Z", doctorName:"Смирнова О.Л.", symptoms:["головная боль","тошнота"], treatmentPlan:"Триптаны", icdGroup:"G00-G99" },
  { id:"D-011", patientId:"P-011", patientName:"Козлов П.В.", code:"J06.9", title:"ОРВИ", description:"Острая респираторная инфекция", severity:"mild", status:"resolved", diagnosedAt:"2024-04-05T09:00:00Z", doctorName:"Ковалёв А.П.", symptoms:["кашель","насморк"], treatmentPlan:"Противовирусные", icdGroup:"J00-J99" },
  { id:"D-012", patientId:"P-005", patientName:"Волков Д.О.", code:"K35.8", title:"Острый аппендицит", description:"Состояние после аппендэктомии", severity:"severe", status:"resolved", diagnosedAt:"2024-03-10T20:00:00Z", doctorName:"Петрова Н.С.", symptoms:["боль в животе"], treatmentPlan:"Аппендэктомия", icdGroup:"K00-K93" },
  { id:"D-013", patientId:"P-004", patientName:"Морозова Е.В.", code:"G44.2", title:"Головная боль напряжения", description:"Хроническая ГБН", severity:"mild", status:"active", diagnosedAt:"2024-02-28T13:00:00Z", doctorName:"Смирнова О.Л.", symptoms:["давящая боль"], treatmentPlan:"Анальгетики", icdGroup:"G00-G99" },
  { id:"D-014", patientId:"P-006", patientName:"Соколова О.Н.", code:"M54.5", title:"Боль в нижней части спины", description:"Дорсалгия", severity:"mild", status:"active", diagnosedAt:"2024-03-18T10:30:00Z", doctorName:"Ковалёв А.П.", symptoms:["боль в пояснице"], treatmentPlan:"НПВС", icdGroup:"M00-M99" },
  { id:"D-015", patientId:"P-010", patientName:"Егорова Т.С.", code:"Z01.8", title:"Профилактический осмотр", description:"Патологий нет", severity:"mild", status:"resolved", diagnosedAt:"2024-04-21T15:00:00Z", doctorName:"Никитина Е.В.", symptoms:[], treatmentPlan:"Осмотр через год", icdGroup:"Z00-Z13" }
];

const prescriptions = [
  { id:"R-001", patientId:"P-001", patientName:"Петров И.С.", appointmentId:"A-001", title:"Витамин D3", description:"Профилактика", type:"medication", status:"completed", priority:"low", prescribedAt:"2024-04-10T09:30:00Z", startDate:"2024-04-10", endDate:"2024-07-10", doctorName:"Ковалёв А.П.", medications:[{name:"Витамин D3",dose:"1000 МЕ",frequency:"1 раз в день",duration:"3 мес"}], instructions:"Принимать во время еды" },
  { id:"R-002", patientId:"P-002", patientName:"Сидорова М.И.", appointmentId:"A-002", title:"Нитроглицерин", description:"При стенокардии", type:"medication", status:"active", priority:"high", prescribedAt:"2024-04-11T11:00:00Z", startDate:"2024-04-11", endDate:"2024-07-11", doctorName:"Никитина Е.В.", medications:[{name:"Нитроглицерин",dose:"0.5 мг",frequency:"при приступе",duration:"по треб."}], instructions:"Под язык" },
  { id:"R-003", patientId:"P-002", patientName:"Сидорова М.И.", appointmentId:"A-002", title:"Бисопролол", description:"Бета-блокатор", type:"medication", status:"active", priority:"high", prescribedAt:"2024-04-11T11:05:00Z", startDate:"2024-04-11", endDate:"2024-10-11", doctorName:"Никитина Е.В.", medications:[{name:"Бисопролол",dose:"5 мг",frequency:"1 раз утром",duration:"6 мес"}], instructions:"Контроль пульса" },
  { id:"R-004", patientId:"P-003", patientName:"Кузнецов А.П.", appointmentId:"A-003", title:"Лизиноприл", description:"ИАПФ", type:"medication", status:"active", priority:"high", prescribedAt:"2024-04-12T11:20:00Z", startDate:"2024-04-12", endDate:"2024-10-12", doctorName:"Ковалёв А.П.", medications:[{name:"Лизиноприл",dose:"10 мг",frequency:"1 раз в день",duration:"6 мес"}], instructions:"Контроль АД" },
  { id:"R-005", patientId:"P-007", patientName:"Лебедев С.А.", appointmentId:"A-007", title:"Метформин", description:"Сахароснижающий", type:"medication", status:"active", priority:"high", prescribedAt:"2024-03-15T10:30:00Z", startDate:"2024-03-15", endDate:"2024-09-15", doctorName:"Иванов Д.М.", medications:[{name:"Метформин",dose:"850 мг",frequency:"2 раза в день",duration:"6 мес"}], instructions:"Во время еды" },
  { id:"R-006", patientId:"P-007", patientName:"Лебедев С.А.", appointmentId:"A-007", title:"Диета при диабете", description:"Стол №9", type:"diet", status:"active", priority:"medium", prescribedAt:"2024-03-15T10:35:00Z", startDate:"2024-03-15", endDate:null, doctorName:"Иванов Д.М.", medications:[], instructions:"Исключить сахар" },
  { id:"R-007", patientId:"P-009", patientName:"Фёдоров Н.И.", appointmentId:"A-009", title:"Контроль креатинина", description:"Анализ каждые 3 мес", type:"procedure", status:"active", priority:"high", prescribedAt:"2024-02-20T14:30:00Z", startDate:"2024-02-20", endDate:"2025-02-20", doctorName:"Иванов Д.М.", medications:[], instructions:"Натощак" },
  { id:"R-008", patientId:"P-009", patientName:"Фёдоров Н.И.", appointmentId:"A-009", title:"Нефропротекция", description:"Защита почек", type:"medication", status:"active", priority:"high", prescribedAt:"2024-02-20T14:40:00Z", startDate:"2024-02-20", endDate:"2024-08-20", doctorName:"Иванов Д.М.", medications:[{name:"Эналаприл",dose:"5 мг",frequency:"1 раз в день",duration:"6 мес"}], instructions:"Контроль АД" },
  { id:"R-009", patientId:"P-012", patientName:"Степанова Ю.А.", appointmentId:"A-012", title:"Лоратадин", description:"Антигистаминный", type:"medication", status:"active", priority:"medium", prescribedAt:"2024-04-01T10:30:00Z", startDate:"2024-04-01", endDate:"2024-06-01", doctorName:"Смирнова О.Л.", medications:[{name:"Лоратадин",dose:"10 мг",frequency:"1 раз в день",duration:"2 мес"}], instructions:"Утром" },
  { id:"R-010", patientId:"P-012", patientName:"Степанова Ю.А.", appointmentId:"A-012", title:"Направление к аллергологу", description:"Обследование", type:"referral", status:"active", priority:"medium", prescribedAt:"2024-04-01T10:35:00Z", startDate:"2024-04-05", endDate:"2024-05-05", doctorName:"Смирнова О.Л.", medications:[], instructions:"Записаться" },
  { id:"R-011", patientId:"P-013", patientName:"Орлов А.М.", appointmentId:"A-013", title:"Холтер-мониторинг", description:"Суточный ЭКГ", type:"procedure", status:"scheduled", priority:"high", prescribedAt:"2024-04-14T09:30:00Z", startDate:"2024-04-25", endDate:"2024-04-26", doctorName:"Никитина Е.В.", medications:[], instructions:"Носить 24 ч" },
  { id:"R-012", patientId:"P-013", patientName:"Орлов А.М.", appointmentId:"A-013", title:"Амиодарон", description:"Антиаритмик", type:"medication", status:"active", priority:"high", prescribedAt:"2024-04-14T09:35:00Z", startDate:"2024-04-14", endDate:"2024-07-14", doctorName:"Никитина Е.В.", medications:[{name:"Амиодарон",dose:"200 мг",frequency:"1 раз в день",duration:"3 мес"}], instructions:"Контроль ТТГ" },
  { id:"R-013", patientId:"P-008", patientName:"Новикова А.Д.", appointmentId:"A-008", title:"Суматриптан", description:"При мигрени", type:"medication", status:"active", priority:"medium", prescribedAt:"2024-03-25T12:00:00Z", startDate:"2024-03-25", endDate:"2024-09-25", doctorName:"Смирнова О.Л.", medications:[{name:"Суматриптан",dose:"50 мг",frequency:"при приступе",duration:"по треб."}], instructions:"При начале боли" },
  { id:"R-014", patientId:"P-006", patientName:"Соколова О.Н.", appointmentId:"A-006", title:"ЛФК при дорсалгии", description:"Упражнения", type:"procedure", status:"active", priority:"medium", prescribedAt:"2024-03-18T11:00:00Z", startDate:"2024-03-20", endDate:"2024-06-20", doctorName:"Ковалёв А.П.", medications:[], instructions:"3 раза в неделю" },
  { id:"R-015", patientId:"P-005", patientName:"Волков Д.О.", appointmentId:"A-005", title:"Перевязка раны", description:"Ежедневно", type:"procedure", status:"completed", priority:"high", prescribedAt:"2024-03-15T10:00:00Z", startDate:"2024-03-15", endDate:"2024-03-25", doctorName:"Петрова Н.С.", medications:[], instructions:"Процедурный кабинет" }
];

const DATA = { patients, appointments, diagnoses, prescriptions };

const LABELS = {
  patientStatus: { active:"Активный", observation:"Наблюдение", discharged:"Выписан" },
  appointmentStatus: { scheduled:"Запланирован", completed:"Завершён", cancelled:"Отменён" },
  diagnosisSeverity: { mild:"Лёгкая", moderate:"Средняя", severe:"Тяжёлая" },
  diagnosisStatus: { active:"Активный", resolved:"Разрешён" },
  prescriptionType: { medication:"Лекарство", procedure:"Процедура", diet:"Диета", referral:"Направление" },
  prescriptionStatus: { scheduled:"Запланировано", active:"Активно", completed:"Завершено", cancelled:"Отменено" },
  prescriptionPriority: { high:"Высокий", medium:"Средний", low:"Низкий" }
};

/* ============================================================
   УТИЛИТЫ
   ============================================================ */

function el(tag, attrs, children) {
  attrs = attrs || {};
  children = children || [];
  var node = document.createElement(tag);
  Object.keys(attrs).forEach(function (key) {
    var value = attrs[key];
    if (value === null || value === undefined || value === false) return;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'dataset') {
      Object.keys(value).forEach(function (k) { node.dataset[k] = value[k]; });
    } else if (key.indexOf('on') === 0 && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (value === true) node.setAttribute(key, '');
    else node.setAttribute(key, value);
  });
  function append(child) {
    if (child === null || child === undefined || child === false) return;
    if (Array.isArray(child)) child.forEach(append);
    else if (typeof child === 'string' || typeof child === 'number') {
      node.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) node.appendChild(child);
  }
  append(children);
  return node;
}

function svgEl(tag, attrs, children) {
  var NS = 'http://www.w3.org/2000/svg';
  var node = document.createElementNS(NS, tag);
  Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
  (Array.isArray(children) ? children : [children]).forEach(function (c) {
    if (c instanceof Node) node.appendChild(c);
  });
  return node;
}

function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

function formatDate(iso) {
  if (!iso) return '—';
  var d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  var dd = String(d.getDate()).padStart(2,'0');
  var mm = String(d.getMonth()+1).padStart(2,'0');
  return dd + '.' + mm + '.' + d.getFullYear();
}

function formatDateTime(iso) {
  if (!iso) return '—';
  var d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return formatDate(iso) + ', ' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
}

function debounce(fn, delay) {
  var t;
  return function () {
    var args = arguments;
    clearTimeout(t);
    t = setTimeout(function () { fn.apply(null, args); }, delay || 300);
  };
}

/* ============================================================
   ТЕМА
   ============================================================ */

var ThemeManager = {
  STORAGE_KEY: 'mis-theme',
  ACCENT_KEY: 'mis-accent',

  init: function () {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    this.updateButtons(current);

    var savedAccent = null;
    try { savedAccent = localStorage.getItem(this.ACCENT_KEY); } catch (e) {}
    if (savedAccent) {
      this.applyAccent(savedAccent);
      var input = document.getElementById('accent-color');
      if (input) input.value = savedAccent;
    }

    this.bindEvents();
    this.watchSystem();
  },

  setTheme: function (theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(this.STORAGE_KEY, theme); } catch (e) {}
    this.updateButtons(theme);
  },

  updateButtons: function (theme) {
    document.querySelectorAll('[data-theme-value]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.themeValue === theme));
    });
  },

  applyAccent: function (hex) {
    var rgb = this.hexToRgb(hex);
    if (!rgb) return;
    document.documentElement.style.setProperty('--accent', hex);
    document.documentElement.style.setProperty('--accent-rgb', rgb.r + ', ' + rgb.g + ', ' + rgb.b);
    document.documentElement.style.setProperty('--accent-hover', this.darken(hex, 0.15));
  },

  hexToRgb: function (hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) } : null;
  },

  darken: function (hex, amount) {
    var rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    var f = 1 - amount;
    function c(v) { return Math.max(0, Math.min(255, Math.round(v * f))).toString(16).padStart(2,'0'); }
    return '#' + c(rgb.r) + c(rgb.g) + c(rgb.b);
  },

  bindEvents: function () {
    var self = this;
    document.querySelectorAll('[data-theme-value]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        self.setTheme(btn.dataset.themeValue);
        Toast.show('Тема изменена', 'success');
      });
    });

    var accentInput = document.getElementById('accent-color');
    if (accentInput) {
      var handler = debounce(function (value) {
        self.applyAccent(value);
        try { localStorage.setItem(self.ACCENT_KEY, value); } catch (e) {}
      }, 100);
      accentInput.addEventListener('input', function (e) { handler(e.target.value); });
      accentInput.addEventListener('change', function (e) {
        self.applyAccent(e.target.value);
        try { localStorage.setItem(self.ACCENT_KEY, e.target.value); } catch (err) {}
        Toast.show('Акцентный цвет обновлён', 'success');
      });
    }
  },

  watchSystem: function () {
    var self = this;
    if (!window.matchMedia) return;
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', function (e) {
      var stored = null;
      try { stored = localStorage.getItem(self.STORAGE_KEY); } catch (err) {}
      if (stored) return;
      self.setTheme(e.matches ? 'dark' : 'light');
    });
  }
};

/* ============================================================
   TOAST
   ============================================================ */

var Toast = {
  container: null,
  counter: 0,

  init: function () {
    this.container = document.getElementById('toast-container');
  },

  show: function (message, type, duration) {
    type = type || 'info';
    if (duration === undefined) duration = 3500;
    if (!this.container) return;

    var self = this;
    var id = 'toast-' + (++this.counter);
    var iconSvg = this.makeIcon(type);
    var icon = el('span', { class: 'toast__icon', 'aria-hidden': 'true' }, [iconSvg]);
    var msg = el('span', { class: 'toast__message', text: message });
    var closeBtn = el('button', { type: 'button', class: 'toast__close', 'aria-label': 'Закрыть уведомление' }, [this.makeCloseIcon()]);

    var toast = el('div', {
      id: id,
      class: 'toast toast--' + type,
      role: type === 'error' ? 'alert' : 'status'
    }, [icon, msg, closeBtn]);

    closeBtn.addEventListener('click', function () { self.remove(toast); });

    this.container.appendChild(toast);

    if (duration > 0) setTimeout(function () { self.remove(toast); }, duration);
  },

  makeIcon: function (type) {
    var svg = svgEl('svg', { width:'18', height:'18', viewBox:'0 0 24 24', 'aria-hidden':'true', focusable:'false' });
    var path = svgEl('path', { stroke:'currentColor', 'stroke-width':'2', fill:'none', 'stroke-linecap':'round' });
    var color = 'var(--info)';
    var d = 'M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z';
    if (type === 'success') { color = 'var(--success)'; d = 'M5 13l4 4L19 7'; }
    else if (type === 'error') { color = 'var(--error)'; d = 'M6 6l12 12M18 6L6 18'; }
    else if (type === 'warning') { color = 'var(--warning)'; d = 'M12 8v5M12 17h.01M10.3 3.9L2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'; }
    path.setAttribute('d', d);
    svg.style.color = color;
    svg.appendChild(path);
    return svg;
  },

  makeCloseIcon: function () {
    var svg = svgEl('svg', { width:'14', height:'14', viewBox:'0 0 24 24', 'aria-hidden':'true', focusable:'false' });
    var path = svgEl('path', { d:'M6 6l12 12M18 6L6 18', stroke:'currentColor', 'stroke-width':'2', fill:'none', 'stroke-linecap':'round' });
    svg.appendChild(path);
    return svg;
  },

  remove: function (toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add('toast--removing');
    toast.addEventListener('animationend', function () { toast.remove(); }, { once: true });
  }
};

/* ============================================================
   MODAL
   ============================================================ */

var Modal = {
  root: null, dialog: null, titleEl: null, bodyEl: null, footerEl: null,
  lastFocused: null,
  FOCUSABLE: 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',

  init: function () {
    var self = this;
    this.root = document.getElementById('modal');
    if (!this.root) return;
    this.dialog = this.root.querySelector('.modal__dialog');
    this.titleEl = document.getElementById('modal-title');
    this.bodyEl = document.getElementById('modal-body');
    this.footerEl = document.getElementById('modal-footer');

    this.root.addEventListener('click', function (e) {
      if (e.target.closest('[data-modal-close]')) self.close();
    });

    document.addEventListener('keydown', function (e) {
      if (self.root.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); self.close(); return; }
      if (e.key === 'Tab') self.trapFocus(e);
    });
  },

  open: function (opts) {
    var self = this;
    this.lastFocused = document.activeElement;
    this.titleEl.textContent = opts.title || '';
    clear(this.bodyEl);
    clear(this.footerEl);

    if (opts.body) {
      if (Array.isArray(opts.body)) opts.body.forEach(function (n) { self.bodyEl.appendChild(n); });
      else this.bodyEl.appendChild(opts.body);
    }
    if (opts.footer) {
      if (Array.isArray(opts.footer)) opts.footer.forEach(function (n) { self.footerEl.appendChild(n); });
      else this.footerEl.appendChild(opts.footer);
    }

    this.root.hidden = false;
    document.body.classList.add('modal-open');

    requestAnimationFrame(function () {
      var first = self.dialog.querySelector(self.FOCUSABLE);
      if (first) first.focus();
    });
  },

  close: function () {
    if (this.root.hidden) return;
    this.root.hidden = true;
    document.body.classList.remove('modal-open');
    if (this.lastFocused && typeof this.lastFocused.focus === 'function') this.lastFocused.focus();
  },

  trapFocus: function (e) {
    var focusable = Array.prototype.slice.call(this.dialog.querySelectorAll(this.FOCUSABLE))
      .filter(function (n) { return !n.hasAttribute('disabled') && n.offsetParent !== null; });
    if (focusable.length === 0) { e.preventDefault(); return; }
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
};

/* ============================================================
   TABS
   ============================================================ */

var Tabs = {
  init: function () {
    document.querySelectorAll('[data-tabs]').forEach(function (root) {
      var tablist = root.querySelector('[role="tablist"]');
      if (!tablist) return;
      var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
      var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });

      function activate(index, focus) {
        if (focus === undefined) focus = true;
        tabs.forEach(function (tab, i) {
          var sel = i === index;
          tab.setAttribute('aria-selected', String(sel));
          tab.setAttribute('tabindex', sel ? '0' : '-1');
          if (panels[i]) panels[i].hidden = !sel;
        });
        if (focus && tabs[index]) tabs[index].focus();
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { activate(i, false); });
      });

      tablist.addEventListener('keydown', function (e) {
        var cur = tabs.indexOf(document.activeElement);
        if (cur === -1) return;
        var next = cur;
        if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') next = (cur - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        else return;
        e.preventDefault();
        activate(next);
      });

      activate(0, false);
    });
  }
};

/* ============================================================
   ACCORDION
   ============================================================ */

var Accordion = {
  init: function () {
    document.querySelectorAll('[data-accordion]').forEach(function (root) {
      root.addEventListener('click', function (e) {
        var trigger = e.target.closest('.accordion__trigger');
        if (!trigger) return;
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        var panel = document.getElementById(trigger.getAttribute('aria-controls'));
        trigger.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  }
};

/* ============================================================
   DROPDOWN
   ============================================================ */

var Dropdown = {
  init: function () {
    var dropdowns = Array.prototype.slice.call(document.querySelectorAll('[data-dropdown]'));

    dropdowns.forEach(function (root) {
      var toggle = root.querySelector('.dropdown__toggle');
      var menu = root.querySelector('.dropdown__menu');
      if (!toggle || !menu) return;

      function items() { return Array.prototype.slice.call(menu.querySelectorAll('[role="menuitem"]')); }

      function open() {
        dropdowns.forEach(function (d) {
          if (d !== root) {
            var m = d.querySelector('.dropdown__menu');
            var t = d.querySelector('.dropdown__toggle');
            if (m) m.hidden = true;
            if (t) t.setAttribute('aria-expanded', 'false');
          }
        });
        menu.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
        var first = items()[0];
        if (first) first.focus();
      }

      function close(returnFocus) {
        if (returnFocus === undefined) returnFocus = true;
        menu.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        if (returnFocus) toggle.focus();
      }

      toggle.addEventListener('click', function () { menu.hidden ? open() : close(); });

      menu.addEventListener('keydown', function (e) {
        var list = items();
        var idx = list.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); list[(idx + 1) % list.length].focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); list[(idx - 1 + list.length) % list.length].focus(); }
        else if (e.key === 'Home') { e.preventDefault(); list[0].focus(); }
        else if (e.key === 'End') { e.preventDefault(); list[list.length - 1].focus(); }
        else if (e.key === 'Escape') { e.preventDefault(); close(); }
      });

      document.addEventListener('click', function (e) {
        if (!menu.hidden && !root.contains(e.target)) close(false);
      });

      menu.addEventListener('click', function (e) {
        if (e.target.closest('[role="menuitem"]')) close();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      dropdowns.forEach(function (root) {
        var menu = root.querySelector('.dropdown__menu');
        var toggle = root.querySelector('.dropdown__toggle');
        if (menu && !menu.hidden) {
          menu.hidden = true;
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
};

/* ============================================================
   PAGINATION
   ============================================================ */

var Pagination = {
  ITEMS_PER_PAGE: 6,

  render: function (container, totalItems, currentPage, onChange) {
    clear(container);
    var totalPages = Math.max(1, Math.ceil(totalItems / this.ITEMS_PER_PAGE));
    if (totalPages <= 1) return;

    function makeBtn(label, page, opts) {
      opts = opts || {};
      var btn = el('button', {
        type: 'button',
        class: 'pagination__btn',
        'aria-label': opts.ariaLabel || ('Страница ' + page),
        text: label,
        disabled: !!opts.disabled
      });
      if (opts.current) btn.setAttribute('aria-current', 'page');
      btn.addEventListener('click', function () { onChange(page); });
      return btn;
    }

    container.appendChild(makeBtn('‹', currentPage - 1, {
      ariaLabel: 'Предыдущая страница', disabled: currentPage === 1
    }));

    this.getPages(currentPage, totalPages).forEach(function (p) {
      if (p === '…') container.appendChild(el('span', { class: 'pagination__ellipsis', text: '…' }));
      else container.appendChild(makeBtn(String(p), p, { current: p === currentPage }));
    });

    container.appendChild(makeBtn('›', currentPage + 1, {
      ariaLabel: 'Следующая страница', disabled: currentPage === totalPages
    }));
  },

  getPages: function (current, total) {
    var pages = [];
    var delta = 1;
    var range = [];
    for (var i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) range.push(i);
    if (current - delta > 2) range.unshift('…');
    if (current + delta < total - 1) range.push('…');
    pages.push(1);
    range.forEach(function (r) { pages.push(r); });
    pages.push(total);
    return pages;
  }
};

/* ============================================================
   VALIDATOR
   ============================================================ */

var Validator = {
  rules: {
    required: function (v) { return (v && v.trim().length > 0) || 'Поле обязательно для заполнения'; },
    email: function (v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Введите корректный email'; },
    phone: function (v) { return !v || /^\+?[\d\s\-()]{10,}$/.test(v) || 'Введите корректный номер телефона'; },
    minLength: function (n) { return function (v) { return !v || v.trim().length >= n || ('Минимум ' + n + ' символов'); }; },
    maxLength: function (n) { return function (v) { return !v || v.trim().length <= n || ('Максимум ' + n + ' символов'); }; }
  },

  validateField: function (input) {
    var rules = (input.dataset.validate || '').split('|').filter(Boolean);
    var value = input.value;
    for (var i = 0; i < rules.length; i++) {
      var parts = rules[i].split(':');
      var name = parts[0];
      var param = parts[1];
      var fn = this.rules[name];
      if (!fn) continue;
      if (param !== undefined) fn = fn(Number(param));
      var result = fn(value);
      if (result !== true) return result;
    }
    return '';
  },

  setFieldError: function (input, message) {
    var errorId = input.id + '-error';
    var errorEl = document.getElementById(errorId);
    if (!errorEl) {
      errorEl = el('span', { id: errorId, class: 'field__error', role: 'alert' });
      input.parentNode.appendChild(errorEl);
    }
    if (message) {
      errorEl.textContent = message;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorId);
    } else {
      errorEl.textContent = '';
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  },

  attach: function (form) {
    var self = this;
    form.querySelectorAll('[data-validate]').forEach(function (input) {
      input.addEventListener('blur', function () {
        self.setFieldError(input, self.validateField(input));
      });
      var debounced = debounce(function () {
        if (input.value.length > 0 || input.getAttribute('aria-invalid') === 'true') {
          self.setFieldError(input, self.validateField(input));
        }
      }, 400);
      input.addEventListener('input', debounced);
    });
  },

  validateForm: function (form) {
    var self = this;
    var valid = true;
    var firstInvalid = null;
    form.querySelectorAll('[data-validate]').forEach(function (input) {
      var msg = self.validateField(input);
      self.setFieldError(input, msg);
      if (msg) { valid = false; if (!firstInvalid) firstInvalid = input; }
    });
    if (firstInvalid) firstInvalid.focus();
    return valid;
  }
};

/* ============================================================
   RENDERER
   ============================================================ */

var Renderer = {
  patientCard: function (p) {
    var card = el('article', { class: 'card', dataset: { id: p.id } });
    card.appendChild(el('header', { class: 'card__header' }, [
      el('div', {}, [
        el('h3', { class: 'card__title', text: p.fullName }),
        el('p', { class: 'card__subtitle', text: 'ID: ' + p.id })
      ]),
      el('span', { class: 'badge badge--' + p.status, text: LABELS.patientStatus[p.status] || p.status })
    ]));
    card.appendChild(el('div', { class: 'card__body' }, [
      el('p', {}, [el('strong', { text: 'Пол: ' }), p.gender === 'male' ? 'Мужской' : 'Женский']),
      el('p', {}, [el('strong', { text: 'Телефон: ' }), p.phone]),
      el('p', {}, [el('strong', { text: 'Email: ' }), p.email]),
      el('p', {}, [el('strong', { text: 'Полис: ' }), p.insurance]),
      el('p', {}, [el('strong', { text: 'Кровь: ' }), p.bloodType])
    ]));
    var meta = el('div', { class: 'card__meta' });
    meta.appendChild(el('span', {}, ['Д.р.: ', el('time', { datetime: p.birthDate, text: formatDate(p.birthDate) })]));
    if (Array.isArray(p.allergies)) {
      p.allergies.forEach(function (a) { meta.appendChild(el('span', { class: 'tag', text: '⚠ ' + a })); });
    }
    card.appendChild(meta);
    card.appendChild(el('div', { class: 'card__actions' }, [
      el('button', {
        type: 'button',
        class: 'btn btn--outline',
        'aria-label': 'Подробнее о пациенте ' + p.fullName,
        text: 'Подробнее',
        'data-action': 'open-patient',
        'data-id': p.id
      })
    ]));
    return card;
  },

  appointmentCard: function (a) {
    var card = el('article', { class: 'card', dataset: { id: a.id } });
    card.appendChild(el('header', { class: 'card__header' }, [
      el('div', {}, [
        el('h3', { class: 'card__title', text: a.doctorName + ' — ' + a.specialty }),
        el('p', { class: 'card__subtitle', text: 'Пациент: ' + a.patientName })
      ]),
      el('span', { class: 'badge badge--' + a.status, text: LABELS.appointmentStatus[a.status] || a.status })
    ]));
    card.appendChild(el('div', { class: 'card__body' }, [
      el('p', {}, [el('strong', { text: 'Дата: ' }), el('time', { datetime: a.date, text: formatDateTime(a.date) })]),
      el('p', {}, [el('strong', { text: 'Кабинет: ' }), a.room]),
      el('p', {}, [el('strong', { text: 'Длительность: ' }), a.duration + ' мин']),
      el('p', {}, [el('strong', { text: 'Причина: ' }), a.reason])
    ]));
    return card;
  },

  diagnosisCard: function (d) {
    var card = el('article', { class: 'card', dataset: { id: d.id } });
    card.appendChild(el('header', { class: 'card__header' }, [
      el('div', {}, [
        el('h3', { class: 'card__title', text: d.title }),
        el('p', { class: 'card__subtitle', text: 'МКБ-10: ' + d.code })
      ]),
      el('span', { class: 'badge badge--' + (d.status === 'active' ? 'error' : 'completed'), text: LABELS.diagnosisStatus[d.status] || d.status })
    ]));
    var body = el('div', { class: 'card__body' }, [
      el('p', { text: d.description }),
      el('p', {}, [el('strong', { text: 'Пациент: ' }), d.patientName]),
      el('p', {}, [el('strong', { text: 'Врач: ' }), d.doctorName]),
      el('p', {}, [el('strong', { text: 'Дата: ' }), el('time', { datetime: d.diagnosedAt, text: formatDate(d.diagnosedAt) })])
    ]);
    if (Array.isArray(d.symptoms) && d.symptoms.length > 0) {
      var sym = el('p', {}, [el('strong', { text: 'Симптомы: ' })]);
      d.symptoms.forEach(function (s, i) {
        if (i > 0) sym.appendChild(document.createTextNode(', '));
        sym.appendChild(el('span', { class: 'tag', text: s }));
      });
      body.appendChild(sym);
    }
    card.appendChild(body);
    var pc = d.severity === 'severe' ? 'priority--high' : d.severity === 'moderate' ? 'priority--medium' : 'priority--low';
    card.appendChild(el('div', { class: 'card__meta' }, [
      el('span', { class: 'priority ' + pc, text: 'Тяжесть: ' + LABELS.diagnosisSeverity[d.severity] })
    ]));
    return card;
  },

  prescriptionCard: function (r) {
    var card = el('article', { class: 'card', dataset: { id: r.id } });
    card.appendChild(el('header', { class: 'card__header' }, [
      el('div', {}, [
        el('h3', { class: 'card__title', text: r.title }),
        el('p', { class: 'card__subtitle', text: LABELS.prescriptionType[r.type] + ' · ' + r.patientName })
      ]),
      el('span', { class: 'badge badge--' + r.status, text: LABELS.prescriptionStatus[r.status] || r.status })
    ]));
    var body = el('div', { class: 'card__body' }, [
      el('p', { text: r.description }),
      el('p', {}, [el('strong', { text: 'Врач: ' }), r.doctorName])
    ]);
    if (Array.isArray(r.medications) && r.medications.length > 0) {
      r.medications.forEach(function (m) {
        body.appendChild(el('p', {}, [
          el('strong', { text: m.name + ': ' }),
          m.dose + ', ' + m.frequency + ', ' + m.duration
        ]));
      });
    }
    if (r.instructions) body.appendChild(el('p', { text: r.instructions }));
    card.appendChild(body);
    var pc = 'priority--' + (r.priority === 'high' ? 'high' : r.priority === 'medium' ? 'medium' : 'low');
    card.appendChild(el('div', { class: 'card__meta' }, [
      el('time', { datetime: r.prescribedAt, text: 'Назначено: ' + formatDate(r.prescribedAt) }),
      el('span', { class: 'priority ' + pc, text: 'Приоритет: ' + LABELS.prescriptionPriority[r.priority] })
    ]));
    return card;
  },

  patientsTable: function (items) {
    var wrap = el('div', { class: 'table-wrap' });
    var table = el('table');
    table.appendChild(el('caption', { text: 'Список пациентов' }));

    var thead = el('thead');
    var headRow = el('tr');
    [
      { key:'fullName', label:'Пациент' },
      { key:'id', label:'ID' },
      { key:'status', label:'Статус' },
      { key:'gender', label:'Пол' },
      { key:'phone', label:'Телефон' },
      { key:'bloodType', label:'Кровь' }
    ].forEach(function (col) {
      headRow.appendChild(el('th', { scope:'col', 'data-key': col.key, text: col.label }));
    });
    thead.appendChild(headRow);

    var tbody = el('tbody');
    items.forEach(function (p) {
      var tr = el('tr');
      tr.appendChild(el('th', { scope:'row', 'data-label':'Пациент', text: p.fullName }));
      tr.appendChild(el('td', { 'data-label':'ID', text: p.id }));
      tr.appendChild(el('td', { 'data-label':'Статус' }, [
        el('span', { class: 'badge badge--' + p.status, text: LABELS.patientStatus[p.status] || p.status })
      ]));
      tr.appendChild(el('td', { 'data-label':'Пол', text: p.gender === 'male' ? 'Мужской' : 'Женский' }));
      tr.appendChild(el('td', { 'data-label':'Телефон', text: p.phone }));
      tr.appendChild(el('td', { 'data-label':'Кровь', text: p.bloodType }));
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  },

  skeleton: function (rows) {
    rows = rows || 6;
    var grid = el('div', { class: 'cards-grid' });
    for (var i = 0; i < rows; i++) {
      var card = el('div', { class: 'card' });
      card.appendChild(el('div', { class: 'card__header' }, [
        el('div', { style: 'flex: 1;' }, [
          el('div', { class: 'skeleton skeleton-line skeleton-line--title' }),
          el('div', { class: 'skeleton skeleton-line skeleton-line--short' })
        ]),
        el('div', { class: 'skeleton', style: 'width: 80px; height: 24px; border-radius: 9999px;' })
      ]));
      var body = el('div', { class: 'card__body' });
      for (var j = 0; j < 3; j++) {
        body.appendChild(el('div', { class: 'skeleton skeleton-line skeleton-line--medium' }));
      }
      card.appendChild(body);
      grid.appendChild(card);
    }
    return grid;
  },

  emptyState: function (opts) {
    var wrap = el('div', { class: 'empty-state' });
    var svg = svgEl('svg', { width:'64', height:'64', viewBox:'0 0 24 24', 'aria-hidden':'true', focusable:'false' });
    var path = svgEl('path', {
      d: 'M9 12h6M9 16h6M9 8h6M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
      stroke: 'currentColor', 'stroke-width': '1.5', fill: 'none', 'stroke-linecap': 'round'
    });
    svg.appendChild(path);
    wrap.appendChild(svg);
    wrap.appendChild(el('h3', { class: 'empty-state__title', text: opts.title || 'Ничего не найдено' }));
    if (opts.text) wrap.appendChild(el('p', { class: 'empty-state__text', text: opts.text }));
    if (opts.actionLabel && typeof opts.onAction === 'function') {
      var btn = el('button', { type: 'button', class: 'btn btn--primary', text: opts.actionLabel });
      btn.addEventListener('click', opts.onAction);
      wrap.appendChild(btn);
    }
    return wrap;
  },

  spinner: function (text) {
    return el('div', { class: 'spinner-wrap' }, [
      el('div', { class: 'spinner', 'aria-hidden': 'true' }),
      el('p', { text: text || 'Загрузка...' })
    ]);
  }
};

/* ============================================================
   MOBILE MENU
   ============================================================ */

var MobileMenu = {
  init: function () {
    var hamburger = document.getElementById('hamburger');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    if (!hamburger || !sidebar || !overlay) return;

    function open() {
      sidebar.classList.add('is-open');
      overlay.hidden = false;
      void overlay.offsetWidth;
      overlay.classList.add('is-visible');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Закрыть меню');
      document.body.classList.add('modal-open');
    }

    function close() {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Открыть меню');
      document.body.classList.remove('modal-open');
      overlay.addEventListener('transitionend', function () {
        if (!overlay.classList.contains('is-visible')) overlay.hidden = true;
      }, { once: true });
    }

    hamburger.addEventListener('click', function () {
      if (hamburger.getAttribute('aria-expanded') === 'true') close();
      else open();
    });

    overlay.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('is-open')) close();
    });

    sidebar.addEventListener('click', function (e) {
      var link = e.target.closest('.nav-link');
      if (link && window.innerWidth < 1024) close();
    });
  }
};

/* ============================================================
   COUNTERS
   ============================================================ */

var Counters = {
  init: function () {
    document.querySelectorAll('[data-counter]').forEach(function (node) {
      var target = Number(node.dataset.counter) || 0;
      Counters.animate(node, target);
    });
  },

  animate: function (node, target) {
    var duration = 1000;
    var start = performance.now();
    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
};

/* ============================================================
   PATIENTS MODULE
   ============================================================ */

var PatientsModule = {
  state: { search:'', status:'', genders:[], view:'cards', sort:'name-asc', page:1 },
  elements: {},

  init: function () {
    this.elements.form = document.getElementById('filters-patients');
    this.elements.search = document.getElementById('search-patients');
    this.elements.status = document.getElementById('status-patients');
    this.elements.content = document.getElementById('patients-content');
    this.elements.pagination = document.getElementById('patients-pagination');
    if (!this.elements.content) return;

    this.bindForm();
    this.bindSort();
    this.bindDelegatedActions();
    this.bindReset();
    this.loadWithSkeleton();
  },

  bindForm: function () {
    var self = this;
    var form = this.elements.form;
    if (!form) return;

    var onSearch = debounce(function (value) {
      self.state.search = value.trim().toLowerCase();
      self.state.page = 1;
      self.render();
    }, 300);

    this.elements.search.addEventListener('input', function (e) { onSearch(e.target.value); });

    this.elements.status.addEventListener('change', function (e) {
      self.state.status = e.target.value;
      self.state.page = 1;
      self.render();
    });

    form.addEventListener('change', function (e) {
      if (e.target.name === 'gender') {
        self.state.genders = Array.prototype.slice.call(form.querySelectorAll('input[name="gender"]:checked')).map(function (cb) { return cb.value; });
        self.state.page = 1;
        self.render();
      }
      if (e.target.name === 'view') {
        self.state.view = e.target.value;
        self.state.page = 1;
        self.render();
      }
    });
  },

  bindReset: function () {
    var self = this;
    var form = this.elements.form;
    if (!form) return;
    form.addEventListener('reset', function () {
      setTimeout(function () {
        self.state.search = '';
        self.state.status = '';
        self.state.genders = [];
        self.state.view = 'cards';
        self.state.sort = 'name-asc';
        self.state.page = 1;
        self.render();
        Toast.show('Фильтры сброшены', 'info');
      }, 0);
    });
  },

  bindSort: function () {
    var self = this;
    var menu = document.querySelector('[data-dropdown] .dropdown__menu');
    if (!menu) return;
    menu.addEventListener('click', function (e) {
      var item = e.target.closest('[data-sort]');
      if (!item) return;
      self.state.sort = item.dataset.sort;
      self.state.page = 1;
      self.render();
      Toast.show('Сортировка применена', 'success', 2000);
    });
  },

  bindDelegatedActions: function () {
    var self = this;
    this.elements.content.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action="open-patient"]');
      if (!btn) return;
      self.openPatientModal(btn.dataset.id);
    });
  },

  loadWithSkeleton: function () {
    var self = this;
    clear(this.elements.content);
    this.elements.content.appendChild(Renderer.skeleton(6));
    setTimeout(function () { self.render(); }, 700);
  },

  getFiltered: function () {
    var s = this.state;
    var items = DATA.patients.slice();

    if (s.search) {
      items = items.filter(function (p) {
        return p.fullName.toLowerCase().indexOf(s.search) !== -1 ||
               p.id.toLowerCase().indexOf(s.search) !== -1 ||
               p.email.toLowerCase().indexOf(s.search) !== -1 ||
               p.phone.indexOf(s.search) !== -1;
      });
    }
    if (s.status) items = items.filter(function (p) { return p.status === s.status; });
    if (s.genders.length > 0) items = items.filter(function (p) { return s.genders.indexOf(p.gender) !== -1; });

    var parts = s.sort.split('-');
    var key = parts[0];
    var dir = parts[1];
    items.sort(function (a, b) {
      var av, bv;
      if (key === 'name') { av = a.fullName; bv = b.fullName; }
      else if (key === 'date') { av = a.createdAt; bv = b.createdAt; }
      else { av = a[key]; bv = b[key]; }
      if (typeof av === 'string') {
        return dir === 'asc' ? av.localeCompare(bv, 'ru') : bv.localeCompare(av, 'ru');
      }
      return dir === 'asc' ? av - bv : bv - av;
    });

    return items;
  },

  render: function () {
    var self = this;
    var content = this.elements.content;
    var pagination = this.elements.pagination;
    clear(content);

    var items = this.getFiltered();

    if (items.length === 0) {
      content.appendChild(Renderer.emptyState({
        title: 'Пациенты не найдены',
        text: 'Попробуйте изменить параметры фильтрации или сбросить их.',
        actionLabel: 'Сбросить фильтры',
        onAction: function () {
          var resetBtn = document.getElementById('reset-patients');
          if (resetBtn) resetBtn.click();
        }
      }));
      clear(pagination);
      return;
    }

    var perPage = Pagination.ITEMS_PER_PAGE;
    var totalPages = Math.max(1, Math.ceil(items.length / perPage));
    if (this.state.page > totalPages) this.state.page = totalPages;

    var start = (this.state.page - 1) * perPage;
    var pageItems = items.slice(start, start + perPage);

    if (this.state.view === 'table') {
      content.appendChild(Renderer.patientsTable(pageItems));
    } else {
      var grid = el('div', { class: 'cards-grid' });
      pageItems.forEach(function (p) { grid.appendChild(Renderer.patientCard(p)); });
      content.appendChild(grid);
    }

    Pagination.render(pagination, items.length, this.state.page, function (page) {
      self.state.page = page;
      self.render();
      content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  },

  openPatientModal: function (id) {
    var p = null;
    for (var i = 0; i < DATA.patients.length; i++) {
      if (DATA.patients[i].id === id) { p = DATA.patients[i]; break; }
    }
    if (!p) return;

    var body = el('div', { class: 'form' }, [
      el('p', {}, [el('strong', { text: 'ФИО: ' }), p.fullName]),
      el('p', {}, [el('strong', { text: 'ID: ' }), p.id]),
      el('p', {}, [el('strong', { text: 'Дата рождения: ' }), el('time', { datetime: p.birthDate, text: formatDate(p.birthDate) })]),
      el('p', {}, [el('strong', { text: 'Пол: ' }), p.gender === 'male' ? 'Мужской' : 'Женский']),
      el('p', {}, [el('strong', { text: 'Телефон: ' }), p.phone]),
      el('p', {}, [el('strong', { text: 'Email: ' }), p.email]),
      el('p', {}, [el('strong', { text: 'Адрес: ' }), p.address]),
      el('p', {}, [el('strong', { text: 'Полис: ' }), p.insurance]),
      el('p', {}, [el('strong', { text: 'Группа крови: ' }), p.bloodType]),
      el('p', {}, [el('strong', { text: 'Аллергии: ' }), p.allergies.length > 0 ? p.allergies.join(', ') : 'Нет']),
      el('p', {}, [el('strong', { text: 'Экстренный контакт: ' }), p.emergencyContact.name + ' (' + p.emergencyContact.relation + '), ' + p.emergencyContact.phone]),
      el('p', {}, [el('strong', { text: 'Заметки: ' }), p.notes || '—']),
      el('p', {}, [el('strong', { text: 'Создан: ' }), el('time', { datetime: p.createdAt, text: formatDateTime(p.createdAt) })])
    ]);

    var closeBtn = el('button', { type: 'button', class: 'btn btn--outline', text: 'Закрыть' });
    closeBtn.addEventListener('click', function () { Modal.close(); });

    Modal.open({
      title: 'Пациент ' + p.fullName,
      body: body,
      footer: closeBtn
    });
  }
};

/* ============================================================
   RENDER OTHER SECTIONS
   ============================================================ */

function renderAppointments() {
  var container = document.getElementById('appointments-content');
  if (!container || container.dataset.rendered === 'true') return;
  clear(container);
  container.appendChild(Renderer.spinner('Загрузка приёмов...'));
  setTimeout(function () {
    clear(container);
    container.dataset.rendered = 'true';
    if (DATA.appointments.length === 0) {
      container.appendChild(Renderer.emptyState({ title: 'Приёмов нет', text: 'Список приёмов пуст.' }));
      return;
    }
    var grid = el('div', { class: 'cards-grid' });
    DATA.appointments.forEach(function (a) { grid.appendChild(Renderer.appointmentCard(a)); });
    container.appendChild(grid);
  }, 500);
}

function renderDiagnoses() {
  var container = document.getElementById('diagnoses-content');
  if (!container || container.dataset.rendered === 'true') return;
  clear(container);
  container.appendChild(Renderer.spinner('Загрузка диагнозов...'));
  setTimeout(function () {
    clear(container);
    container.dataset.rendered = 'true';
    if (DATA.diagnoses.length === 0) {
      container.appendChild(Renderer.emptyState({ title: 'Диагнозов нет', text: 'Список диагнозов пуст.' }));
      return;
    }
    var grid = el('div', { class: 'cards-grid' });
    DATA.diagnoses.forEach(function (d) { grid.appendChild(Renderer.diagnosisCard(d)); });
    container.appendChild(grid);
  }, 500);
}

function renderPrescriptions() {
  var container = document.getElementById('prescriptions-content');
  if (!container || container.dataset.rendered === 'true') return;
  clear(container);
  container.appendChild(Renderer.spinner('Загрузка назначений...'));
  setTimeout(function () {
    clear(container);
    container.dataset.rendered = 'true';
    if (DATA.prescriptions.length === 0) {
      container.appendChild(Renderer.emptyState({ title: 'Назначений нет', text: 'Список назначений пуст.' }));
      return;
    }
    var grid = el('div', { class: 'cards-grid' });
    DATA.prescriptions.forEach(function (r) { grid.appendChild(Renderer.prescriptionCard(r)); });
    container.appendChild(grid);
  }, 500);
}

/* ============================================================
   ADD PATIENT FORM
   ============================================================ */

var AddPatientForm = {
  init: function () {
    var self = this;
    var btn = document.getElementById('add-patient');
    if (!btn) return;
    btn.addEventListener('click', function () { self.open(); });
  },

  open: function () {
    var form = el('form', {
      class: 'form',
      id: 'add-patient-form',
      novalidate: true,
      'aria-label': 'Форма добавления пациента'
    });

    var fields = [
      { id:'f-fullname', label:'ФИО', type:'text', validate:'required|minLength:2|maxLength:100', placeholder:'Иванов Иван Иванович' },
      { id:'f-birthdate', label:'Дата рождения', type:'date', validate:'required' },
      { id:'f-phone', label:'Телефон', type:'tel', validate:'required|phone', placeholder:'+7-900-000-00-00' },
      { id:'f-email', label:'Email', type:'email', validate:'required|email', placeholder:'patient@example.com' },
      { id:'f-address', label:'Адрес', type:'text', validate:'required|minLength:5', placeholder:'г. Москва, ул. Примерная, 1' }
    ];

    fields.forEach(function (f) {
      var input = el('input', {
        id: f.id,
        name: f.id,
        type: f.type,
        class: 'field__input',
        placeholder: f.placeholder || '',
        'data-validate': f.validate,
        autocomplete: 'off'
      });
      form.appendChild(el('div', { class: 'form__row' }, [
        el('label', { for: f.id, class: 'field__label' }, [
          f.label,
          el('span', { class: 'form__required', 'aria-hidden': 'true', text: '*' })
        ]),
        input
      ]));
    });

    form.appendChild(el('div', { class: 'form__row' }, [
      el('span', { class: 'field__label', text: 'Пол *' }),
      el('div', { class: 'radio-group' }, [
        el('label', { class: 'radio' }, [
          el('input', { type: 'radio', name: 'gender', value: 'male', checked: true }),
          el('span', { class: 'radio__box', 'aria-hidden': 'true' }),
          el('span', { text: 'Мужской' })
        ]),
        el('label', { class: 'radio' }, [
          el('input', { type: 'radio', name: 'gender', value: 'female' }),
          el('span', { class: 'radio__box', 'aria-hidden': 'true' }),
          el('span', { text: 'Женский' })
        ])
      ])
    ]));

    Validator.attach(form);

    var cancelBtn = el('button', { type: 'button', class: 'btn btn--outline', text: 'Отмена' });
    cancelBtn.addEventListener('click', function () { Modal.close(); });
    var submitBtn = el('button', { type: 'submit', class: 'btn btn--primary', text: 'Сохранить' });
    var footer = el('div', { class: 'flex-row' }, [cancelBtn, submitBtn]);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!Validator.validateForm(form)) {
        Toast.show('Исправьте ошибки в форме', 'error');
        return;
      }
      Modal.close();
      Toast.show('Пациент успешно добавлен', 'success');
    });

    Modal.open({ title: 'Добавление пациента', body: form, footer: footer });

    requestAnimationFrame(function () {
      var first = form.querySelector('input');
      if (first) first.focus();
    });
  }
};

/* ============================================================
   APP INIT
   ============================================================ */

function initApp() {
  try {
    Toast.init();
    ThemeManager.init();
    Modal.init();
    Tabs.init();
    Accordion.init();
    Dropdown.init();
    MobileMenu.init();
    Counters.init();
    PatientsModule.init();
    AddPatientForm.init();

    var tabAppointments = document.getElementById('tab-appointments');
    var tabDiagnoses = document.getElementById('tab-diagnoses');
    var tabPrescriptions = document.getElementById('tab-prescriptions');

    if (tabAppointments) tabAppointments.addEventListener('click', renderAppointments);
    if (tabDiagnoses) tabDiagnoses.addEventListener('click', renderDiagnoses);
    if (tabPrescriptions) tabPrescriptions.addEventListener('click', renderPrescriptions);

    setTimeout(function () {
      Toast.show('Добро пожаловать в МИС!', 'info', 3000);
    }, 800);
  } catch (err) {
    console.error('Ошибка инициализации:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}