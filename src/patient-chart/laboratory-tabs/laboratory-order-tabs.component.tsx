import React, { useState } from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@carbon/react";
import styles from "./laboratory-order-tabs.scss";
import { useTranslation } from "react-i18next";
import PatientLaboratoryReferalResults from "../laboratory-order-referals/laboratory-order-referals.component";
import PatientLaboratoryResults from "../patient-laboratory-results.component";

interface LaboratoryResultsTabsProps {
  patientUuid: string;
}

const LaboratoryResultsTabs: React.FC<LaboratoryResultsTabsProps> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <div className={styles.container}>
        <Tabs
          selectedIndex={selectedTab}
          onChange={({ selectedIndex }) => setSelectedTab(selectedIndex)}
          className={styles.tabs}
        >
          <TabList
            style={{ paddingLeft: "1rem" }}
            aria-label="laboratory results tabs"
            contained
          >
            <Tab>{t("pending", "Routine Tests")}</Tab>
            <Tab>{t("referals", "Referrals")}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel style={{ padding: 0 }}>
              <PatientLaboratoryResults patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel style={{ padding: 0 }}>
              <div style={{ margin: "10px" }}>
                <PatientLaboratoryReferalResults patientUuid={patientUuid} />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
};

export default LaboratoryResultsTabs;
