import type { LanguageCode } from '../types/language'

const en = {
  landing_tagline: 'The easy way out of Sea-Tac',
  landing_tap: 'Tap anywhere to continue',
  lang_choose: 'Choose your language',
  lang_done: 'Done',
  lang_step1: 'Step 1 of 3',

  arr_title: 'Tell us about your arrival',
  arr_subtitle: 'Help us estimate your time through Sea-Tac',

  seg_domestic_t: 'Domestic',
  seg_domestic_d: 'Within the U.S.',
  seg_intl_t: 'International',
  seg_intl_d: 'Outside the U.S.',
  seg_citizen_t: 'Citizen',
  seg_citizen_d: 'Passport lane',
  seg_non_citizen_t: 'Non-citizen',
  seg_non_citizen_d: 'Foreign passport or visa',
  ttp_checkbox: 'Trusted Traveler Program (GE, NEXUS, SENTRI)',

  f_gate_l: 'Select Your Gate',
  f_gate_p: 'Gate Number',
  f_car_l: 'Baggage Claim',
  f_car_p: 'Carousel Number',
  f_tr_l: 'Ground Transport',
  f_tr_p: 'Transportation Type',
  f_dest_l: 'Where are you headed?',
  f_dest_p: 'Destination',

  trav_label: 'Number of Travelers',
  trav_range: 'Party size {{min}}–{{max}}',
  trav_minus: 'Decrease travelers',
  trav_plus: 'Increase travelers',

  cta_directions: 'Show Directions',
  step2: 'Step 2 of 3',

  g_title: 'Ground Transportation',
  g_sub: 'Explore options to leave the airport',
  g_ride_t: 'Ride Share',
  g_ride_s: 'Uber & Lyft Pickup',
  g_rail_t: 'Light Rail',
  g_rail_s: 'Link Station',
  g_taxi_t: 'Taxi',
  g_taxi_s: 'Taxi Stand Location',
  g_park_t: 'Parking',
  g_park_s: 'Garage & Lot Info',

  ap_title: 'Airport Information',
  ap_sub: 'Helpful Tips and FAQ',

  hdr_menu: 'Open menu',

  r_title: 'Your arrival plan',
  r_sub: 'Summary for Sea-Tac (mock estimate)',
  r_details: 'Selected details',
  r_next: 'Next steps',
  r_back: 'Back to form',
  r_close: 'Close',
  r_close_bd: 'Close dialog',

  r_l_flight: 'Flight:',
  r_l_traveler: 'Traveler:',
  r_l_gate: 'Gate:',
  r_l_carousel: 'Carousel:',
  r_l_transport: 'Transport:',
  r_l_dest: 'Destination:',
  r_l_party: 'Party size:',

  r_domestic: 'Domestic',
  r_intl: 'International',
  r_citizen: 'Citizen',
  r_non_citizen: 'Non-citizen',
  r_ttp: 'Trusted Traveler Program',

  e_gate: 'Select your arrival gate.',
  e_carousel: 'Select a baggage carousel.',
  e_transport: 'Choose how you are leaving the airport.',
  e_dest: 'Choose your destination area.',

  opt_gate_word: 'Gate',
  opt_carousel_word: 'Carousel',
  opt_gate_ph: 'Gate Number',
  opt_car_ph: 'Carousel Number',
  opt_car_ov: 'Oversized baggage',
  opt_tr_ph: 'Transportation Type',
  opt_dest_ph: 'Destination',

  opt_tr_rs: 'Ride Share (Uber / Lyft)',
  opt_tr_link: 'Link Light Rail',
  opt_tr_taxi: 'Taxi',
  opt_tr_rent: 'Rental car / Personal vehicle',
  opt_tr_shuttle: 'Hotel / courtesy shuttle',

  opt_de_dtw: 'Downtown Seattle',
  opt_de_bel: 'Bellevue / Eastside',
  opt_de_ud: 'University District',
  opt_de_cruise: 'Cruise / Pier 66 / Pier 91',
  opt_de_south: 'South King County',
  opt_de_north: 'North Seattle / Shoreline',

  plan_gate: 'From {{gate}}, follow overhead signs toward baggage claim and ground transport.',
  plan_ttp:
    'Use the Trusted Traveler lane (Global Entry, NEXUS, SENTRI) if eligible; have documents ready for CBP.',
  plan_passport:
    'Proceed to passport control with your travel documents; allow extra time at peak times.',
  plan_bags:
    'Collect checked bags at your assigned carousel; confirm the carousel on airport monitors if your flight is delayed.',
  plan_exit:
    'Exit toward {{transport}} pickup or station areas — Sea-Tac signage is color-coded by terminal.',
  plan_route:
    'Route toward {{destination}}: if using Link, budget about 40–50 minutes to central Seattle during typical service.',
  plan_party:
    'Traveling as a party of {{n}}: allow a few extra minutes for elevators, restrooms, and ticketing.',
} as const

export type MessageKey = keyof typeof en

const es: Record<MessageKey, string> = {
  landing_tagline: 'La forma fácil de salir de Sea-Tac',
  landing_tap: 'Toca en cualquier lugar para continuar',
  lang_choose: 'Elige tu idioma',
  lang_done: 'Listo',
  lang_step1: 'Paso 1 de 3',

  arr_title: 'Cuéntanos sobre tu llegada',
  arr_subtitle: 'Ayúdanos a estimar tu tiempo en Sea-Tac',

  seg_domestic_t: 'Nacional',
  seg_domestic_d: 'Dentro de EE. UU.',
  seg_intl_t: 'Internacional',
  seg_intl_d: 'Fuera de EE. UU.',
  seg_citizen_t: 'Ciudadano',
  seg_citizen_d: 'Fila de pasaporte',
  seg_non_citizen_t: 'No ciudadano',
  seg_non_citizen_d: 'Pasaporte extranjero o visa',
  ttp_checkbox: 'Programa Viajero de Confianza (GE, NEXUS, SENTRI)',

  f_gate_l: 'Selecciona tu puerta',
  f_gate_p: 'Número de puerta',
  f_car_l: 'Recogida de equipaje',
  f_car_p: 'Número de carrusel',
  f_tr_l: 'Transporte terrestre',
  f_tr_p: 'Tipo de transporte',
  f_dest_l: '¿A dónde vas?',
  f_dest_p: 'Destino',

  trav_label: 'Número de viajeros',
  trav_range: 'Grupo de {{min}} a {{max}}',
  trav_minus: 'Reducir viajeros',
  trav_plus: 'Aumentar viajeros',

  cta_directions: 'Mostrar indicaciones',
  step2: 'Paso 2 de 3',

  g_title: 'Transporte terrestre',
  g_sub: 'Opciones para salir del aeropuerto',
  g_ride_t: 'Viaje compartido',
  g_ride_s: 'Recogida Uber y Lyft',
  g_rail_t: 'Tren ligero',
  g_rail_s: 'Estación Link',
  g_taxi_t: 'Taxi',
  g_taxi_s: 'Parada de taxis',
  g_park_t: 'Estacionamiento',
  g_park_s: 'Garaje e información de lotes',

  ap_title: 'Información del aeropuerto',
  ap_sub: 'Consejos útiles y preguntas frecuentes',

  hdr_menu: 'Abrir menú',

  r_title: 'Tu plan de llegada',
  r_sub: 'Resumen para Sea-Tac (estimación de ejemplo)',
  r_details: 'Detalles seleccionados',
  r_next: 'Próximos pasos',
  r_back: 'Volver al formulario',
  r_close: 'Cerrar',
  r_close_bd: 'Cerrar diálogo',

  r_l_flight: 'Vuelo:',
  r_l_traveler: 'Viajero:',
  r_l_gate: 'Puerta:',
  r_l_carousel: 'Carrusel:',
  r_l_transport: 'Transporte:',
  r_l_dest: 'Destino:',
  r_l_party: 'Tamaño del grupo:',

  r_domestic: 'Nacional',
  r_intl: 'Internacional',
  r_citizen: 'Ciudadano',
  r_non_citizen: 'No ciudadano',
  r_ttp: 'Programa de viajero de confianza',

  e_gate: 'Selecciona tu puerta de llegada.',
  e_carousel: 'Selecciona un carrusel de equipaje.',
  e_transport: 'Elige cómo sales del aeropuerto.',
  e_dest: 'Elige tu zona de destino.',

  opt_gate_word: 'Puerta',
  opt_carousel_word: 'Carrusel',
  opt_gate_ph: 'Número de puerta',
  opt_car_ph: 'Número de carrusel',
  opt_car_ov: 'Equipaje de gran tamaño',
  opt_tr_ph: 'Tipo de transporte',
  opt_dest_ph: 'Destino',

  opt_tr_rs: 'Viaje compartido (Uber / Lyft)',
  opt_tr_link: 'Tren ligero Link',
  opt_tr_taxi: 'Taxi',
  opt_tr_rent: 'Coche de alquiler / vehículo particular',
  opt_tr_shuttle: 'Hotel / shuttle de cortesía',

  opt_de_dtw: 'Centro de Seattle',
  opt_de_bel: 'Bellevue / Eastside',
  opt_de_ud: 'Distrito Universitario',
  opt_de_cruise: 'Crucero / Muelle 66 / Muelle 91',
  opt_de_south: 'Sur del condado de King',
  opt_de_north: 'Norte de Seattle / Shoreline',

  plan_gate:
    'Desde {{gate}}, sigue las señales hacia recogida de equipaje y transporte terrestre.',
  plan_ttp:
    'Usa la fila de Viajero de Confianza (Global Entry, NEXUS, SENTRI) si aplica; ten listos los documentos para CBP.',
  plan_passport:
    'Dirígete a control de pasaportes con tus documentos; permite tiempo extra en horas punta.',
  plan_bags:
    'Recoge el equipaje facturado en el carrusel asignado; confírmalo en los monitores si tu vuelo se retrasa.',
  plan_exit:
    'Sal hacia la zona de {{transport}} o estaciones — la señalización de Sea-Tac está codificada por color por terminal.',
  plan_route:
    'Rumbo a {{destination}}: si usas Link, calcula unos 40–50 minutos al centro de Seattle en servicio típico.',
  plan_party:
    'En grupo de {{n}} personas: añade unos minutos extra para ascensores, baños y taquillas.',
}

const zh: Record<MessageKey, string> = {
  landing_tagline: '轻松走出西雅图-塔科马机场',
  landing_tap: '轻触屏幕任意处继续',
  lang_choose: '选择语言',
  lang_done: '完成',
  lang_step1: '第 1 步，共 3 步',

  arr_title: '告诉我们您的到达信息',
  arr_subtitle: '帮助我们估算您在 Sea-Tac 的通关时间',

  seg_domestic_t: '国内航班',
  seg_domestic_d: '美国境内航班',
  seg_intl_t: '国际航班',
  seg_intl_d: '美国境外出发',
  seg_citizen_t: '公民',
  seg_citizen_d: '护照通道',
  seg_non_citizen_t: '非公民',
  seg_non_citizen_d: '外国护照或签证',
  ttp_checkbox: '可信旅客计划（GE、NEXUS、SENTRI）',

  f_gate_l: '选择登机口',
  f_gate_p: '登机口编号',
  f_car_l: '行李提取',
  f_car_p: '转盘编号',
  f_tr_l: '地面交通',
  f_tr_p: '交通方式',
  f_dest_l: '您要去哪里？',
  f_dest_p: '目的地',

  trav_label: '旅客人数',
  trav_range: '同行人数 {{min}}–{{max}}',
  trav_minus: '减少人数',
  trav_plus: '增加人数',

  cta_directions: '显示路线',
  step2: '第 2 步，共 3 步',

  g_title: '地面交通',
  g_sub: '离开机场的出行方式',
  g_ride_t: '网约车',
  g_ride_s: 'Uber 与 Lyft 上车点',
  g_rail_t: '轻轨',
  g_rail_s: 'Link 车站',
  g_taxi_t: '出租车',
  g_taxi_s: '出租车站位置',
  g_park_t: '停车',
  g_park_s: '车库与停车场信息',

  ap_title: '机场信息',
  ap_sub: '实用提示与常见问题',

  hdr_menu: '打开菜单',

  r_title: '您的到达计划',
  r_sub: 'Sea-Tac 摘要（示例估算）',
  r_details: '所选信息',
  r_next: '下一步',
  r_back: '返回表单',
  r_close: '关闭',
  r_close_bd: '关闭对话框',

  r_l_flight: '航班：',
  r_l_traveler: '旅客类型：',
  r_l_gate: '登机口：',
  r_l_carousel: '行李转盘：',
  r_l_transport: '交通：',
  r_l_dest: '目的地：',
  r_l_party: '同行人数：',

  r_domestic: '国内',
  r_intl: '国际',
  r_citizen: '公民',
  r_non_citizen: '非公民',
  r_ttp: '可信旅客计划',

  e_gate: '请选择到达登机口。',
  e_carousel: '请选择行李转盘。',
  e_transport: '请选择离开机场的方式。',
  e_dest: '请选择目的地区域。',

  opt_gate_word: '登机口',
  opt_carousel_word: '转盘',
  opt_gate_ph: '登机口编号',
  opt_car_ph: '转盘编号',
  opt_car_ov: '超大行李',
  opt_tr_ph: '交通方式',
  opt_dest_ph: '目的地',

  opt_tr_rs: '网约车（Uber / Lyft）',
  opt_tr_link: 'Link 轻轨',
  opt_tr_taxi: '出租车',
  opt_tr_rent: '租车 / 私家车',
  opt_tr_shuttle: '酒店 / 免费班车',

  opt_de_dtw: '西雅图市中心',
  opt_de_bel: '贝尔维尤 / 东区',
  opt_de_ud: '大学区',
  opt_de_cruise: '邮轮 / 66 号码头 / 91 号码头',
  opt_de_south: '金县南部',
  opt_de_north: '西雅图北部 / 肖尔线',

  plan_gate: '从 {{gate}} 出发，按指示牌前往行李提取与地面交通。',
  plan_ttp: '如符合条件，请使用可信旅客通道（Global Entry、NEXUS、SENTRI）；备好 CBP 所需证件。',
  plan_passport: '携带旅行证件前往护照检查；高峰时段请预留更多时间。',
  plan_bags: '在指定转盘提取托运行李；若航班延误，请在机场显示屏上再次确认。',
  plan_exit: '前往 {{transport}} 乘车区或车站 — Sea-Tac 指示牌按航站楼用颜色区分。',
  plan_route: '前往 {{destination}}：若乘坐 Link，在常规运营下请预留约 40–50 分钟到西雅图市中心。',
  plan_party: '同行 {{n}} 人：为电梯、洗手间与购票预留几分钟额外时间。',
}

const ko: Record<MessageKey, string> = {
  landing_tagline: 'Sea-Tac을 빠져나가는 쉬운 방법',
  landing_tap: '아무 곳이나 탭하여 계속',
  lang_choose: '언어를 선택하세요',
  lang_done: '완료',
  lang_step1: '1/3 단계',

  arr_title: '도착에 대해 알려주세요',
  arr_subtitle: 'Sea-Tac 통과 시간을 추정하는 데 도움을 주세요',

  seg_domestic_t: '국내선',
  seg_domestic_d: '미국 내 항공편',
  seg_intl_t: '국제선',
  seg_intl_d: '미국 외 출발',
  seg_citizen_t: '시민',
  seg_citizen_d: '여권 라인',
  seg_non_citizen_t: '비시민',
  seg_non_citizen_d: '외국 여권 또는 비자',
  ttp_checkbox: '신뢰 여행자 프로그램(GE, NEXUS, SENTRI)',

  f_gate_l: '게이트 선택',
  f_gate_p: '게이트 번호',
  f_car_l: '수하물 찾기',
  f_car_p: '캐러셀 번호',
  f_tr_l: '지상 교통',
  f_tr_p: '교통 수단',
  f_dest_l: '어디로 가시나요?',
  f_dest_p: '목적지',

  trav_label: '여행자 수',
  trav_range: '인원 {{min}}–{{max}}',
  trav_minus: '인원 줄이기',
  trav_plus: '인원 늘리기',

  cta_directions: '길 안내 보기',
  step2: '2/3 단계',

  g_title: '지상 교통',
  g_sub: '공항을 떠나는 방법',
  g_ride_t: '라이드셰어',
  g_ride_s: 'Uber 및 Lyft 승차',
  g_rail_t: '경전철',
  g_rail_s: 'Link 역',
  g_taxi_t: '택시',
  g_taxi_s: '택시 승차장',
  g_park_t: '주차',
  g_park_s: '주차장 안내',

  ap_title: '공항 정보',
  ap_sub: '유용한 팁과 FAQ',

  hdr_menu: '메뉴 열기',

  r_title: '도착 계획',
  r_sub: 'Sea-Tac 요약(예시 추정)',
  r_details: '선택한 내용',
  r_next: '다음 단계',
  r_back: '양식으로 돌아가기',
  r_close: '닫기',
  r_close_bd: '대화 상자 닫기',

  r_l_flight: '항공편:',
  r_l_traveler: '여행자:',
  r_l_gate: '게이트:',
  r_l_carousel: '캐러셀:',
  r_l_transport: '교통:',
  r_l_dest: '목적지:',
  r_l_party: '인원:',

  r_domestic: '국내선',
  r_intl: '국제선',
  r_citizen: '시민',
  r_non_citizen: '비시민',
  r_ttp: '신뢰 여행자 프로그램',

  e_gate: '도착 게이트를 선택하세요.',
  e_carousel: '수하물 캐러셀을 선택하세요.',
  e_transport: '공항을 떠나는 방법을 선택하세요.',
  e_dest: '목적 지역을 선택하세요.',

  opt_gate_word: '게이트',
  opt_carousel_word: '캐러셀',
  opt_gate_ph: '게이트 번호',
  opt_car_ph: '캐러셀 번호',
  opt_car_ov: '대형 수하물',
  opt_tr_ph: '교통 수단',
  opt_dest_ph: '목적지',

  opt_tr_rs: '라이드셰어(Uber / Lyft)',
  opt_tr_link: 'Link 경전철',
  opt_tr_taxi: '택시',
  opt_tr_rent: '렌터카 / 자가용',
  opt_tr_shuttle: '호텔 / 셔틀',

  opt_de_dtw: '시애틀 다운타운',
  opt_de_bel: '벨뷰 / 이스트사이드',
  opt_de_ud: '대학 지구',
  opt_de_cruise: '크루즈 / 피어 66 / 피어 91',
  opt_de_south: '킹 카운티 남부',
  opt_de_north: '북시애틀 / 쇼어라인',

  plan_gate: '{{gate}}에서 수하물 및 지상 교통 안내를 따라 이동하세요.',
  plan_ttp:
    '해당 시 신뢰 여행자 라인(Global Entry, NEXUS, SENTRI)을 이용하세요. CBP 서류를 준비하세요.',
  plan_passport: '여행 서류를 지참해 여권 심사로 이동하세요. 혼잡 시간에는 여유를 두세요.',
  plan_bags: '배정된 캐러셀에서 위탁 수하물을 찾으세요. 지연이 있으면 전광판을 확인하세요.',
  plan_exit: '{{transport}} 승차 지역 또는 역으로 이동하세요. Sea-Tac 표지는 터미널별 색상으로 구분됩니다.',
  plan_route:
    '{{destination}}(으)로 이동: Link 이용 시 통상적으로 시애틀 시내까지 약 40–50분을 예상하세요.',
  plan_party: '동행 {{n}}명: 엘리베이터, 화장실, 매표에 몇 분 더 여유를 두세요.',
}

const ja: Record<MessageKey, string> = {
  landing_tagline: 'Sea-Tac をスムーズに出る方法',
  landing_tap: 'どこかをタップして続行',
  lang_choose: '言語を選択',
  lang_done: '完了',
  lang_step1: 'ステップ 1 / 3',

  arr_title: '到着について教えてください',
  arr_subtitle: 'Sea-Tac の所要時間の目安にご協力ください',

  seg_domestic_t: '国内線',
  seg_domestic_d: '米国内の便',
  seg_intl_t: '国際線',
  seg_intl_d: '米国外発',
  seg_citizen_t: '市民',
  seg_citizen_d: 'パスポートレーン',
  seg_non_citizen_t: '非市民',
  seg_non_citizen_d: '外国パスポートまたはビザ',
  ttp_checkbox: '信頼できる旅行者プログラム（GE、NEXUS、SENTRI）',

  f_gate_l: 'ゲートを選択',
  f_gate_p: 'ゲート番号',
  f_car_l: '手荷物受取',
  f_car_p: 'カルーセル番号',
  f_tr_l: '地上交通',
  f_tr_p: '交通手段',
  f_dest_l: '行き先は？',
  f_dest_p: '目的地',

  trav_label: '旅行者の人数',
  trav_range: '人数 {{min}}～{{max}}',
  trav_minus: '人数を減らす',
  trav_plus: '人数を増やす',

  cta_directions: '道順を表示',
  step2: 'ステップ 2 / 3',

  g_title: '地上交通',
  g_sub: '空港からの移動手段',
  g_ride_t: 'ライドシェア',
  g_ride_s: 'Uber / Lyft 乗り場',
  g_rail_t: 'ライトレール',
  g_rail_s: 'Link 駅',
  g_taxi_t: 'タクシー',
  g_taxi_s: 'タクシー乗り場',
  g_park_t: '駐車',
  g_park_s: '駐車場情報',

  ap_title: '空港情報',
  ap_sub: 'ヒントとよくある質問',

  hdr_menu: 'メニューを開く',

  r_title: '到着プラン',
  r_sub: 'Sea-Tac の概要（参考見積もり）',
  r_details: '選択した内容',
  r_next: '次のステップ',
  r_back: 'フォームに戻る',
  r_close: '閉じる',
  r_close_bd: 'ダイアログを閉じる',

  r_l_flight: '便:',
  r_l_traveler: '旅行者:',
  r_l_gate: 'ゲート:',
  r_l_carousel: 'カルーセル:',
  r_l_transport: '交通:',
  r_l_dest: '目的地:',
  r_l_party: '人数:',

  r_domestic: '国内線',
  r_intl: '国際線',
  r_citizen: '市民',
  r_non_citizen: '非市民',
  r_ttp: '信頼できる旅行者プログラム',

  e_gate: '到着ゲートを選択してください。',
  e_carousel: '手荷物カルーセルを選択してください。',
  e_transport: '空港からの移動方法を選択してください。',
  e_dest: '目的地エリアを選択してください。',

  opt_gate_word: 'ゲート',
  opt_carousel_word: 'カルーセル',
  opt_gate_ph: 'ゲート番号',
  opt_car_ph: 'カルーセル番号',
  opt_car_ov: '特大手荷物',
  opt_tr_ph: '交通手段',
  opt_dest_ph: '目的地',

  opt_tr_rs: 'ライドシェア（Uber / Lyft）',
  opt_tr_link: 'Link ライトレール',
  opt_tr_taxi: 'タクシー',
  opt_tr_rent: 'レンタカー / 自家用車',
  opt_tr_shuttle: 'ホテル / シャトル',

  opt_de_dtw: 'ダウンタウン・シアトル',
  opt_de_bel: 'ベルビュー / イーストサイド',
  opt_de_ud: '大学地区',
  opt_de_cruise: 'クルーズ / ピア 66 / ピア 91',
  opt_de_south: 'キング郡南部',
  opt_de_north: 'ノースシアトル / ショアライン',

  plan_gate: '{{gate}} から案内に従い手荷物受取と地上交通へ。',
  plan_ttp:
    '対象の場合は信頼できる旅行者レーン（Global Entry、NEXUS、SENTRI）を利用し、CBP の書類を準備してください。',
  plan_passport: '旅券などを持って入国審査へ。混雑時は余裕を持って。',
  plan_bags: '指定のカルーセルで預け荷物を受け取ります。遅延時はモニターで確認してください。',
  plan_exit: '{{transport}} の乗り場または駅方面へ。Sea-Tac の案内はターミナルごとに色分けされています。',
  plan_route:
    '{{destination}} へ：Link 利用時は通常ダウンタウンまで約 40～50 分を目安にしてください。',
  plan_party: '同行 {{n}} 名：エレベーター・トイレ・券売に数分余裕を。',
}

const vi: Record<MessageKey, string> = {
  landing_tagline: 'Cách dễ dàng rời Sea-Tac',
  landing_tap: 'Chạm bất kỳ đâu để tiếp tục',
  lang_choose: 'Chọn ngôn ngữ',
  lang_done: 'Xong',
  lang_step1: 'Bước 1 / 3',

  arr_title: 'Cho chúng tôi biết về chuyến đến của bạn',
  arr_subtitle: 'Giúp ước tính thời gian qua Sea-Tac',

  seg_domestic_t: 'Nội địa',
  seg_domestic_d: 'Chuyến trong Hoa Kỳ',
  seg_intl_t: 'Quốc tế',
  seg_intl_d: 'Chuyến từ ngoài Hoa Kỳ',
  seg_citizen_t: 'Công dân',
  seg_citizen_d: 'Làn hộ chiếu',
  seg_non_citizen_t: 'Không phải công dân',
  seg_non_citizen_d: 'Hộ chiếu nước ngoài hoặc thị thực',
  ttp_checkbox: 'Chương trình du khách tin cậy (GE, NEXUS, SENTRI)',

  f_gate_l: 'Chọn cửa lên máy bay',
  f_gate_p: 'Số cửa',
  f_car_l: 'Nhận hành lý',
  f_car_p: 'Số băng chuyền',
  f_tr_l: 'Giao thông mặt đất',
  f_tr_p: 'Phương tiện',
  f_dest_l: 'Bạn đi đâu?',
  f_dest_p: 'Điểm đến',

  trav_label: 'Số người đi cùng',
  trav_range: 'Nhóm {{min}}–{{max}} người',
  trav_minus: 'Giảm số người',
  trav_plus: 'Tăng số người',

  cta_directions: 'Hiển thị chỉ đường',
  step2: 'Bước 2 / 3',

  g_title: 'Giao thông mặt đất',
  g_sub: 'Cách rời sân bay',
  g_ride_t: 'Xe chia sẻ',
  g_ride_s: 'Đón Uber & Lyft',
  g_rail_t: 'Tàu nhẹ',
  g_rail_s: 'Ga Link',
  g_taxi_t: 'Taxi',
  g_taxi_s: 'Điểm taxi',
  g_park_t: 'Đỗ xe',
  g_park_s: 'Thông tin bãi & nhà xe',

  ap_title: 'Thông tin sân bay',
  ap_sub: 'Mẹo hay & Câu hỏi thường gặp',

  hdr_menu: 'Mở menu',

  r_title: 'Kế hoạch đến',
  r_sub: 'Tóm tắt Sea-Tac (ước tính mẫu)',
  r_details: 'Chi tiết đã chọn',
  r_next: 'Bước tiếp theo',
  r_back: 'Quay lại biểu mẫu',
  r_close: 'Đóng',
  r_close_bd: 'Đóng hộp thoại',

  r_l_flight: 'Chuyến bay:',
  r_l_traveler: 'Hành khách:',
  r_l_gate: 'Cửa:',
  r_l_carousel: 'Băng chuyền:',
  r_l_transport: 'Phương tiện:',
  r_l_dest: 'Điểm đến:',
  r_l_party: 'Số người:',

  r_domestic: 'Nội địa',
  r_intl: 'Quốc tế',
  r_citizen: 'Công dân',
  r_non_citizen: 'Không phải công dân',
  r_ttp: 'Chương trình du khách tin cậy',

  e_gate: 'Chọn cửa đến của bạn.',
  e_carousel: 'Chọn băng chuyền hành lý.',
  e_transport: 'Chọn cách bạn rời sân bay.',
  e_dest: 'Chọn khu vực đến.',

  opt_gate_word: 'Cửa',
  opt_carousel_word: 'Băng chuyền',
  opt_gate_ph: 'Số cửa',
  opt_car_ph: 'Số băng chuyền',
  opt_car_ov: 'Hành lý cồng kềnh',
  opt_tr_ph: 'Phương tiện',
  opt_dest_ph: 'Điểm đến',

  opt_tr_rs: 'Xe chia sẻ (Uber / Lyft)',
  opt_tr_link: 'Tàu nhẹ Link',
  opt_tr_taxi: 'Taxi',
  opt_tr_rent: 'Thuê xe / Xe cá nhân',
  opt_tr_shuttle: 'Khách sạn / xe đưa đón',

  opt_de_dtw: 'Trung tâm Seattle',
  opt_de_bel: 'Bellevue / Eastside',
  opt_de_ud: 'Khu đại học',
  opt_de_cruise: 'Du thuyền / Pier 66 / Pier 91',
  opt_de_south: 'Nam quận King',
  opt_de_north: 'Bắc Seattle / Shoreline',

  plan_gate: 'Từ {{gate}}, theo biển chỉ dẫn đến nhận hành lý và giao thông mặt đất.',
  plan_ttp:
    'Dùng làn Du khách tin cậy (Global Entry, NEXUS, SENTRI) nếu đủ điều kiện; chuẩn bị giấy tờ cho CBP.',
  plan_passport: 'Đến kiểm soát hộ chiếu với giấy tờ; thêm thời gian giờ cao điểm.',
  plan_bags: 'Nhận hành lý ký gửi tại băng chuyền được chỉ định; kiểm tra màn hình nếu chuyến bay trễ.',
  plan_exit: 'Ra khu {{transport}} hoặc ga — biển chỉ Sea-Tac theo màu theo nhà ga.',
  plan_route:
    'Hướng tới {{destination}}: nếu dùng Link, dự phòng khoảng 40–50 phút vào trung tâm Seattle khi vận hành bình thường.',
  plan_party: 'Đi {{n}} người: thêm vài phút cho thang máy, WC và mua vé.',
}

export const dictionaries = {
  en,
  es,
  zh,
  ko,
  ja,
  vi,
} as const satisfies Record<LanguageCode, Record<MessageKey, string>>
