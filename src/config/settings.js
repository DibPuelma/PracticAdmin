var API_HOST = 'http://localhost:8000';

exports.COMPANY_POLLS              = API_HOST + '/company/:id/poll';
exports.COMPANY_POLL               = API_HOST + '/company/:company_id/poll/:poll_id';
exports.COMPANY_QUESTION           = API_HOST + '/company/:company_id/question/:question_id';
exports.COMPANY_QUESTIONS          = API_HOST + '/company/:company_id/question';
exports.COMPANY_OPTIONS_CONTAINERS = API_HOST + '/company/:company_id/options_container';
exports.COMPANY_OPTIONS_CONTAINER  = API_HOST + '/company/:company_id/options_container/:id';
exports.COMPANY_POSSIBLE_OPTIONS   = API_HOST + '/company/:company_id/possible_option';
exports.COMPANY_EMPLOYEE           = API_HOST + '/company/:company_id/employee';

exports.COMPANY_DATE_AGE                = API_HOST + '/company/:company_id/dashboard/respondents_age/:start_date/:end_date';
exports.COMPANY_DATE_GENDER             = API_HOST + '/company/:company_id/dashboard/respondents_gender/:start_date/:end_date';
exports.COMPANY_DATE_BEST_AVG_QUESTION  = API_HOST + '/company/:company_id/dashboard/:gender/best_average_question/:start_date/:end_date';
exports.COMPANY_DATE_BEST_AVG_POLL      = API_HOST + '/company/:company_id/dashboard/:gender/best_average_poll/:start_date/:end_date';
exports.COMPANY_DATE_BEST_AVG_STORE     = API_HOST + '/company/:company_id/dashboard/:gender/best_average_sell_point/:start_date/:end_date';
exports.COMPANY_DATE_AGE_AVG            = API_HOST + '/company/:company_id/dashboard/average_age/:start_date/:end_date';

//Fechas en formato dd-mm-aaaa
exports.COMPANY_DATE_TOTAL        = API_HOST + '/company/:company_id/dashboard/total_answers/:start_date/:end_date';
exports.COMPANY_DATE_AVG          = API_HOST + '/company/:company_id/dashboard/average/:start_date/:end_date';

exports.STORES                     = API_HOST + '/company/:company_id/sell_point';
exports.STORE_AVG                  = API_HOST + '/company/:company_id/sell_point/:sell_point_id/average_stars/:start_date/:end_date';
exports.STORE_AVG_BY_GENDER        = API_HOST + '/company/:company_id/sell_point/:sell_point_id/average_stars_by_gender/:start_date/:end_date';
exports.STORE_TOTAL                = API_HOST + '/company/:company_id/sell_point/:sell_point_id/total_answers/:start_date/:end_date';
exports.STORE_TOTAL_BY_GENDER      = API_HOST + '/company/:company_id/sell_point/:sell_point_id/total_answers_by_gender/:start_date/:end_date';
exports.STORE_AGE                  = API_HOST + '/company/:company_id/sell_point/:sell_point_id/respondents_age/:start_date/:end_date';
exports.STORE_AVG_AGE              = API_HOST + '/company/:company_id/sell_point/:sell_point_id/average_age/:start_date/:end_date';
exports.STORE_GENDER               = API_HOST + '/company/:company_id/sell_point/:sell_point_id/respondents_gender/:start_date/:end_date';

exports.POLLS                      = API_HOST + '/company/:company_id/poll';
exports.POLL_AVG                   = API_HOST + '/company/:company_id/poll/:poll_id/average_stars/:start_date/:end_date';
exports.POLL_AVG_BY_GENDER         = API_HOST + '/company/:company_id/poll/:poll_id/average_stars_by_gender/:start_date/:end_date';
exports.POLL_TOTAL                 = API_HOST + '/company/:company_id/poll/:poll_id/total_answers/:start_date/:end_date';
exports.POLL_TOTAL_BY_GENDER       = API_HOST + '/company/:company_id/poll/:poll_id/total_answers_by_gender/:start_date/:end_date';
exports.POLL_AGE                   = API_HOST + '/company/:company_id/poll/:poll_id/respondents_age/:start_date/:end_date';
exports.POLL_AVG_AGE               = API_HOST + '/company/:company_id/poll/:poll_id/average_age/:start_date/:end_date';
exports.POLL_GENDER                = API_HOST + '/company/:company_id/poll/:poll_id/respondents_gender/:start_date/:end_date';

exports.QUESTIONS                  = API_HOST + '/company/:company_id/question';
exports.QUESTION_AVG               = API_HOST + '/company/:company_id/question/:question_id/average_stars/:start_date/:end_date';
exports.QUESTION_AVG_BY_GENDER     = API_HOST + '/company/:company_id/question/:question_id/average_stars_by_gender/:start_date/:end_date';
exports.QUESTION_TOTAL             = API_HOST + '/company/:company_id/question/:question_id/total_answers/:start_date/:end_date';
exports.QUESTION_TOTAL_BY_GENDER   = API_HOST + '/company/:company_id/question/:question_id/total_answers_by_gender/:start_date/:end_date';
exports.QUESTION_AGE               = API_HOST + '/company/:company_id/question/:question_id/respondents_age/:start_date/:end_date';
exports.QUESTION_AVG_AGE           = API_HOST + '/company/:company_id/question/:question_id/average_age/:start_date/:end_date';
exports.QUESTION_GENDER            = API_HOST + '/company/:company_id/question/:question_id/respondents_gender/:start_date/:end_date';
exports.QUESTION_BOOLEAN           = API_HOST + '/company/:company_id/question/:question_id/boolean_answers/:start_date/:end_date';
exports.QUESTION_TEXT              = API_HOST + '/company/:company_id/question/:question_id/text_answers/:start_date/:end_date';
exports.QUESTION_OPTIONS           = API_HOST + '/company/:company_id/question/:question_id/options_answers/:start_date/:end_date';

exports.EMPLOYEES                      = API_HOST + '/company/:company_id/employee';
exports.EMPLOYEE_AVG                   = API_HOST + '/company/:company_id/employee/:employee_id/average_stars/:start_date/:end_date';
exports.EMPLOYEE_AVG_BY_GENDER         = API_HOST + '/company/:company_id/employee/:employee_id/average_stars_by_gender/:start_date/:end_date';
exports.EMPLOYEE_TOTAL                 = API_HOST + '/company/:company_id/employee/:employee_id/total_answers/:start_date/:end_date';
exports.EMPLOYEE_TOTAL_BY_GENDER       = API_HOST + '/company/:company_id/employee/:employee_id/total_answers_by_gender/:start_date/:end_date';
exports.EMPLOYEE_AGE                   = API_HOST + '/company/:company_id/employee/:employee_id/respondents_age/:start_date/:end_date';
exports.EMPLOYEE_AVG_AGE               = API_HOST + '/company/:company_id/employee/:employee_id/average_age/:start_date/:end_date';
exports.EMPLOYEE_GENDER                = API_HOST + '/company/:company_id/employee/:employee_id/respondents_gender/:start_date/:end_date';
