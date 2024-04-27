//let parseTimeus = d3.timeFormat("%Y-%m-%d");
const timeFormatLocale = d3.timeFormatLocale({
  "dateTime": "%A, %e %B %Y г. %X",
  "date": "%d.%m.%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
  "shortDays": ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
  "months": ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
  "shortMonths": ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
});

const help = [
  /* Client */
  {
    name: 'count_seller_all',
    Groups: 'Client',
    type: 'Продавцы'
  },
  {
    name: 'count_seller_external',
    Groups: 'Client',
    type: 'МЛСН и пр.'
  },
  {
    name: 'count_buyer_all',
    Groups: 'Client',
    type: 'Покупатели'
  },
  {
    name: 'count_buyer_new_realty',
    Groups: 'Client',
    type: 'Новостройка покуп.'
  },
  /* Call */
  {
    name: 'count_calls_owner_seller',
    Groups: 'Call',
    type: 'Продавцы свои'
  },
  {
    name: 'count_calls_owner_seller_nb',
    Groups: 'Call',
    type: ' новостр.'
  },
  {
    name: 'count_calls_owner_buyer',
    Groups: 'Call',
    type: 'Покупатели свои'
  },
  {
    name: 'count_calls_owner_bueyr_nb',
    Groups: 'Call',
    type: 'Покупатели свои новостр.'
  },
  {
    name: 'count_calls_common_buyer',
    Groups: 'Call',
    type: 'Покупатели общ.'
  },
  {
    name: 'count_calls_common_buyer_nb',
    Groups: 'Call',
    type: 'Покупатели общ. новостр.'
  },
  {
    name: 'count_calls_common_seller',
    Groups: 'Call',
    type: ''
  },
  {
    name: 'count_calls_common_seller_nb',
    Groups: 'Call',
    type: 'Продавцы общие новостр.'
  },
  {
    name: 'count_calls_owner_seller_external',
    Groups: 'Call',
    type: 'МЛСН и пр. свои'
  },
  {
    name: 'count_calls_seller_external',
    Groups: 'Call',
    type: 'МЛСН и пр. общие'
  },
  {
    name: 'count_calls_bk',
    Groups: 'Call',
    type: 'БК'
  },
  /* Contract */
  {
    name: 'count_contract_owner_seller',
    Groups: 'Contract',
    type: 'Свои'
  },
  {
    name: 'count_contract_common_seller',
    Groups: 'Contract',
    type: 'Щбщие'
  },
  {
    name: 'count_contract_bk',
    Groups: 'Contract',
    type: 'БК'
  },
  {
    name: 'count_contract_external_seller',
    Groups: 'Contract',
    type: 'МЛСН и пр.'
  },
  /* Additional */
  {
    name: 'count_additional_528',
    Groups: 'Additional',
    type: 'Подбор'
  },
  {
    name: 'count_additional_529',
    Groups: 'Additional',
    type: 'Сопровождение'
  },
  {
    name: 'all',
    Groups: 'Additional',
    type: 'Перепланировка'
  },
];
// load data
let url_github = 'https://raw.githubusercontent.com/roz-git/test/main/export.json'
let url_json = 'https://raw.githubusercontent.com/roz-git/test/main/d3-get-data.json'
/* return {
        CountryName: d.CountryName,
        IndicatorName: d.IndicatorName,
        Year: d.Year,
        Value: +d.Value
   }
   filtered = data.filter(function(d) { return d.CountryName === "China"});
   console.log(filtered); */
let data_json = d3.json(url_json)
  .then(djson => {
    console.log('djson',djson)
    filter=(djson.ByGroup.Additional)
    init(filter)
    update(filter)
  })
  .catch(error => console.log(error));

(function ($, Drupal, once) {
  $.ajax({
    url: url_json,
    type: 'GET',
    dataType: 'json',
    data: {
      '_format': 'json',
      'limit': 5,
    },
    success: response => {
      console.log(response);
    },
    error: response => {
      console.log(response.respononseText);
    },
  }
  );
  // $.ajax({
  //   url: '/api/v1/d3-get-data',
  //   type: 'GET',
  //   dataType: 'json',
  //   data: {
  //     '_format': 'json',
  //     'limit': 5,
  //   },
  //   success: response => {
  //     console.log(response);
  //   },
  //   error: response => {
  //     console.log(response.respononseText);
  //   },
  // });
})(jQuery, Drupal);
