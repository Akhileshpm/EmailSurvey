import sendGrid from "sendgrid";
const helper = sendGrid.mail;
import keys from "../config/keys.js";


class Mailer extends helper.Mail{
    constructor({ subject, recipients }, content){
        super();

        this.sgApi = sendGrid(keys.sendGridKey)
        this.from_email = new helper.Email('appumithr@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);
        
        //addContent is provided by helper.Mail
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }
    formatAddresses(recipients){
        return recipients.map(({ email }) => {
            return helper.Email(email);
        })
    }
    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    addRecipients(){
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);        
        });
        this.addPersonalization(personalize);
    }
    async send(){
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        const response = await this.sgApi.API(request);
        return response;
    }
}
export default Mailer;