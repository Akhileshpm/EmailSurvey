import keys from '../../config/dev.js';
export default function(survey){
    return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input!</h3>
          <p>${survey.title}</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/response/${survey.id}/yes">Yes</a>
          </div>
          <div>
            <a style={  background-color: "blue",
              color: "white",
              padding: "14px 25px",
              text-align: "center",
              text-decoration: "none",
              display: "inline-block"} href="${keys.redirectDomain}/response/${survey.id}/no">No</a>
          </div>
        </div>
      </body>
    </html>
    `
}