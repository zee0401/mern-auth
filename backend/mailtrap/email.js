import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
} from "./emailTemplates.js";

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

export const sendResetPasswordEmail = async (email, resetURL) => {
  const recipent = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipent,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending email, ${error}`);
  }
};
