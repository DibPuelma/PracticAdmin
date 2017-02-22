var API_HOST = 'http://localhost:8000';

exports.COMPANY_POLLS              = API_HOST + "/company/:id/poll";
exports.COMPANY_POLL               = API_HOST + "/company/:company_id/poll/:poll_id";
exports.COMPANY_QUESTION           = API_HOST + "/company/:company_id/question/:question_id";
exports.COMPANY_QUESTIONS          = API_HOST + "/company/:company_id/question";
exports.COMPANY_OPTIONS_CONTAINERS = API_HOST + "/company/:company_id/options_container";
exports.COMPANY_OPTIONS_CONTAINER  = API_HOST + "/company/:company_id/options_container/:id";
exports.COMPANY_POSSIBLE_OPTIONS   = API_HOST + "/company/:company_id/possible_option";
exports.COMPANY_EMPLOYEES          = API_HOST + "/company/:company_id/employee";
exports.COMPANY_EMPLOYEE           = API_HOST + "/company/:company_id/employee/:id";
exports.COMPANY_SELLPOINTS         = API_HOST + "/company/:company_id/sell_point";

exports.MANAGER_LOGIN              = API_HOST + "/manager/login";

