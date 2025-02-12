import {
  Button,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
  InlineLoading,
} from "@carbon/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePatient } from "@openmrs/esm-framework";
import styles from "./results-summary.scss";

interface SendEmailDialogProps {
  patientUuid: string;
  closeModal: () => void;
}

const SendEmailDialog: React.FC<SendEmailDialogProps> = ({
  patientUuid,
  closeModal,
}) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState();
  const [file, setFile] = useState();

  const { patient, isLoading } = usePatient(patientUuid);

  // setEmail()

  // generate pdf

  const sendEmail = async () => {
    // initialize nodemailer
    // var transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   secure: true,
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    //   auth: {
    //     user: "services.ugandaemr@gmail.com",
    //     pass: "Admin1234_",
    //   },
    // });
    // // point to the template folder
    // const handlebarOptions = {
    //   viewEngine: {
    //     extname: ".hbs",
    //     layoutsDir: "views/",
    //     defaultLayout: "template",
    //     partialsDir: "views/partials/",
    //   },
    //   viewPath: "views/",
    //   extName: ".hbs",
    // };
    // transporter.use("compile", hbs(handlebarOptions));
    // const mailOptions = {
    //   from: "services.ugandaemr@gmail.com",
    //   to: email,
    //   subject: `Tests results`,
    //   attachments: [{ filename: "testResults.pdf", path: file }],
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     showNotification({
    //       title: `Error in sending results`,
    //       kind: "error",
    //       critical: true,
    //       description: error?.message,
    //     });
    //   } else {
    //     showToast({
    //       critical: true,
    //       title: `Sent Test Results`,
    //       kind: "success",
    //       description: `Test results sent Successfully`,
    //     });
    //   }
    // });
  };

  return (
    <>
      <Form onSubmit={sendEmail}>
        <ModalHeader
          closeModal={closeModal}
          title={t("sendResults", "Send Results")}
        />
        <ModalBody>
          {isLoading && (
            <InlineLoading
              className={styles.bannerLoading}
              iconDescription="Loading"
              description="Loading banner"
              status="active"
            />
          )}
          {patient?.address ? (
            <div>
              <TextInput
                id="text-input-email"
                invalidText="Error message goes here"
                labelText="Email"
                onChange={(e) => setEmail(e.target.value)}
                size="md"
                type="email"
              />
            </div>
          ) : (
            "Patient doesn't have an email address"
          )}
        </ModalBody>
        <ModalFooter>
          <Button kind="secondary" onClick={closeModal}>
            {t("cancel", "Cancel")}
          </Button>
          <Button type="submit">{t("sendEmail", "Send Email")}</Button>
        </ModalFooter>
      </Form>
    </>
  );
};

export default SendEmailDialog;
