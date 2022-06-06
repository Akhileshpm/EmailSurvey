const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// eslint-disable-next-line import/no-anonymous-default-export
export default (emails) => {
  const invalidEmails = emails
    .split(',')
    .map((email) => email.trim())
    .filter(nullValue => nullValue !== '')
    .filter(email => re.test(email) === false);
    
    if(invalidEmails.length){
        return `These email IDs are invalid: ${invalidEmails}`;
    }

    return null;
}
