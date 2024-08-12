import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipent = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipent,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(error);
    throw new Error("Error sending email", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipent = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipent,
      template_uuid: "4965a17a-91d4-41f1-94bd-ddea12a155af",
      template_variables: {
        company_info_name: "This is the comapany INfo",
        name: "Auth company",
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending email, ${error}`);
  }
};
