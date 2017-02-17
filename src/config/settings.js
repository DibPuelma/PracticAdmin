var API_HOST = 'http://localhost:8000';

exports.COMPANY_POLLS              = API_HOST + '/company/:id/poll';
exports.COMPANY_POLL               = API_HOST + '/company/:company_id/poll/:poll_id';
exports.COMPANY_QUESTION           = API_HOST + '/company/:company_id/question/:question_id';
exports.COMPANY_QUESTIONS          = API_HOST + '/company/:company_id/question';
exports.COMPANY_OPTIONS_CONTAINERS = API_HOST + '/company/:company_id/options_container';
exports.COMPANY_OPTIONS_CONTAINER  = API_HOST + '/company/:company_id/options_container/:id';
exports.COMPANY_POSSIBLE_OPTIONS   = API_HOST + '/company/:company_id/possible_option';
exports.COMPANY_EMPLOYEE           = API_HOST + '/company/:company_id/employee';
exports.COMPANY_AVG                = API_HOST + '/company/:company_id/average_stars';
exports.COMPANY_TOTAL              = API_HOST + '/company/:company_id/total_answers';
exports.COMPANY_AGE                = API_HOST + '/company/:company_id/respondents_age';
exports.COMPANY_GENDER             = API_HOST + '/company/:company_id/respondents_gender';
exports.COMPANY_BEST_AVG_QUESTION  = API_HOST + '/company/:company_id/dashboard/:gender/best_average_question';
exports.COMPANY_BEST_AVG_POLL      = API_HOST + '/company/:company_id/dashboard/:gender/best_average_poll';
exports.COMPANY_BEST_AVG_STORE     = API_HOST + '/company/:company_id/dashboard/:gender/best_average_sell_point';
exports.COMPANY_AGE_AVG            = API_HOST + '/company/:company_id/dashboard/average_age';

//Fechas en formato dd-mm-aaaa
exports.COMPANY_DATE_TOTAL        = API_HOST + '/company/:company_id/dashboard/total_answers/:start_date/:end_date';
exports.COMPANY_DATE_AVG          = API_HOST + '/company/:company_id/dashboard/average';

exports.STORES                     = API_HOST + '/company/:company_id/sell_point';
exports.STORE_AVG                  = API_HOST + '/company/:company_id/sell_point/:sell_point_id/average_stars';
exports.STORE_TOTAL                = API_HOST + '/company/:company_id/sell_point/:sell_point_id/total_answers';
exports.STORE_AGE                  = API_HOST + '/company/:company_id/sell_point/:sell_point_id/respondents_age';
exports.STORE_GENDER               = API_HOST + '/company/:company_id/sell_point/:sell_point_id/respondents_gender';

exports.POLLS                      = API_HOST + '/company/:company_id/poll';
exports.POLL_AVG                   = API_HOST + '/company/:company_id/poll/:poll_id/average_stars';
exports.POLL_TOTAL                 = API_HOST + '/company/:company_id/poll/:poll_id/total_answers';
exports.POLL_AGE                   = API_HOST + '/company/:company_id/poll/:poll_id/respondents_age';
exports.POLL_GENDER                = API_HOST + '/company/:company_id/poll/:poll_id/respondents_gender';

exports.QUESTIONS                  = API_HOST + '/company/:company_id/question';
exports.QUESTION_AVG               = API_HOST + '/company/:company_id/question/:question_id/average_stars';
exports.QUESTION_TOTAL             = API_HOST + '/company/:company_id/question/:question_id/total_answers';
exports.QUESTION_AGE               = API_HOST + '/company/:company_id/question/:question_id/respondents_age';
exports.QUESTION_GENDER            = API_HOST + '/company/:company_id/question/:question_id/respondents_gender';
exports.QUESTION_BOOLEAN           = API_HOST + '/company/:company_id/question/:question_id/boolean_answers';
exports.QUESTION_TEXT              = API_HOST + '/company/:company_id/question/:question_id/text_answers';
exports.QUESTION_OPTIONS           = API_HOST + '/company/:company_id/question/:question_id/options_answers';
