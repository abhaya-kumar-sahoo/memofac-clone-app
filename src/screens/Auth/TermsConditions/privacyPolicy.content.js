import {Text, View} from 'react-native';
import React from 'react';
import {VertSpace} from 'shared/Global.styles';
import {AppFonts} from 'assets/fonts/AppFonts';
import {AppColors} from 'assets/AppColors';

export const privacyContent =
  'Udit Dugar built the Memofac app as a Free app. This SERVICE is provided by Udit Dugar at no cost and is intended for use as is.\r\n\r\nThis page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.\r\n\r\nIf you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.\r\n\r\nThe terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Memofac unless otherwise defined in this Privacy Policy.\r\n\r\nInformation Collection and Use\r\n\r\nFor a better experience, while using our Service, I may require you to provide us with certain personally identifiable information, including but not limited to Username, Year of Birth, Gender, Contacts, Gallery, Mobile number.\r\n\r\nThe app does use third-party services that may collect information used to identify you.\r\n\r\nLink to the privacy policy of third-party service providers used by the app\r\n\r\nGoogle Play Services\r\nGoogle Analytics for Firebase\r\nLog Data\r\n\r\nI want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (\u201CIP\u201D) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.\r\n\r\n\r\nService Providers\r\n\r\nI may employ third-party companies and individuals due to the following reasons:\r\n\r\nTo facilitate our Service;\r\nTo provide the Service on our behalf;\r\nTo perform Service-related services; or\r\nTo assist us in analyzing how our Service is used.\r\nI want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.\r\n\r\nSecurity\r\n\r\nI value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.\r\n\r\nLinks to Other Sites\r\n\r\nThis Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.\r\n\r\nChildren\u2019s Privacy\r\n\r\n\r\n\r\nChanges to This Privacy Policy\r\n\r\nI may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page.\r\n\r\nThis policy is effective as of 2022-01-03\r\n\r\nContact Us\r\n\r\nIf you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at memofacapp@gmail.com.';

export const PrivacyPolicyContent = () => {
  return (
    <View>
      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        Memofac is a free app intended for use as is.
      </Text>
      <VertSpace size={10} />
      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        This page is used to inform visitors regarding Memofac's policies with
        the collection, use, and disclosure of Personal Information if anyone
        decided to use Memofac's Service.
      </Text>
      <VertSpace />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        If you choose to use Memofac's Service, then you agree to the collection
        and use of information in relation to this policy. The Personal
        Information that We collect is used for providing and improving the
        Service. We will not use or share your information with anyone except as
        described in this Privacy Policy.The terms used in this Privacy Policy
        have the same meanings as in our Terms and Conditions, which are
        accessible at Memofac unless otherwise defined in this Privacy Policy.
      </Text>
      <VertSpace size={20} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          color: AppColors.LowDark,
        }}>
        Information Collection and Use
      </Text>
      <VertSpace size={10} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        For a better experience, while using our Service, I may require you to
        provide us with certain personally identifiable information, including
        but not limited to Username, Year of Birth, Gender, Contacts, Gallery,
        Mobile number.
      </Text>
      <VertSpace />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        The app does use third-party services that may collect information used
        to identify you.
      </Text>
      <VertSpace />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        Link to the privacy policy of third-party service providers used by the
        app
      </Text>
      <VertSpace />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        Google Play Services {'\n'}Google Analytics for Firebase {'\n'}Log Data{' '}
      </Text>
      <VertSpace />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        We want to inform you that whenever you use Memofac's Service, in a case
        of an error in the app we collect data and information (through
        third-party products) on your phone called Log Data. This Log Data may
        include information such as your device Internet Protocol ("IP")
        address, device name, operating system version, the configuration of the
        app when utilizing Memofac's Service, the time and date of your use of
        the Service, and other statistics.
      </Text>
      <VertSpace size={20} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          color: AppColors.LowDark,
        }}>
        Service Providers
      </Text>
      <VertSpace size={10} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        We may employ third-party companies and individuals due to the following
        reasons:
      </Text>
      <VertSpace />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        To facilitate our Service;{'\n'}
        To provide the Service on our behalf;{'\n'}
        To perform Service-related services;or{'\n'}
        To assist us in analyzing how our Service is used.
      </Text>
      <VertSpace />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        We want to inform users of this Service that these third parties have
        access to their Personal Information. The reason is to perform the tasks
        assigned to them on our behalf. However, they are obligated not to
        disclose or use the information for any other purpose.
      </Text>
      <VertSpace size={20} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          color: AppColors.LowDark,
        }}>
        Security
      </Text>
      <VertSpace size={10} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        We value your trust in providing us your Personal Information, thus we
        are striving to use commercially acceptable means of protecting it. But
        remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and we cannot guarantee
        its absolute security.
      </Text>
      <VertSpace size={20} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          color: AppColors.LowDark,
        }}>
        Links to Other Sites
      </Text>
      <VertSpace size={10} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        Memofac app may contain links to other sites. If you click on a
        third-party link, you will be directed to that site. Note that these
        external sites are not operated by us. Therefore, we strongly advise you
        to review the Privacy Policy of these websites. We have no control over
        and assume no responsibility for the content, privacy policies, or
        practices of any third-party sites or services.
      </Text>
      <VertSpace size={20} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          color: AppColors.LowDark,
        }}>
        Children's Privacy
      </Text>
      <VertSpace size={10} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        Services are not intended for or designed to attract anyone under the
        relevant age of consent to enter into binding legal contracts under the
        laws of their respective jurisdictions. Memofac does not intentionally
        or knowingly collect personal information through the Services from
        anyone under that age. We encourage parents and guardians to be involved
        in the online activities of their children to ensure that no personal
        information is collected from a child without their consent.
      </Text>
      <VertSpace size={20} />
      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          color: AppColors.LowDark,
        }}>
        Changes to This Privacy Policy
      </Text>
      <VertSpace size={10} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        We may update our Privacy Policy from time to time. Thus, you are
        advised to review this page periodically for any changes. We will notify
        you of any changes by posting the new Privacy Policy on this page.
      </Text>
      <VertSpace />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        This policy is effective as of 2022-01-03
      </Text>
      <VertSpace size={20} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          color: AppColors.LowDark,
        }}>
        Contact Us
      </Text>
      <VertSpace size={10} />

      <Text
        style={{
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.MediumGrey,
        }}>
        If you have any questions or suggestions about our Privacy Policy, do
        not hesitate to contact us at memofacapp@gmail.com. ;
      </Text>
    </View>
  );
};
