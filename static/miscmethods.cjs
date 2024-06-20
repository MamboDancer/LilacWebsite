checkUser = (req) => 
{
    let params = ['Main Page', 'Hello EJS', false, false]
    if(req.session.user)
    {
        if(req.session.admin) 
        {
            params[2] = true
            params[3] = true
        }
            
        else
        {
            params[2] = true
            params[3] = false
        }
    }
    else
    {
        params[2] = false
        params[3] = false
    }
    return params
}

exports.checkUser = checkUser