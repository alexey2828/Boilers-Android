import React, { ReactNode, useContext, useState } from 'react';
import { Text, View, TouchableHighlight, Image, TouchableOpacity, Pressable } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import Modal from 'react-native-modal';
import { styles } from './headerStyle.styles';
import { ENavigationName } from '../infrastructure/const/navigation-name';
import { TMember } from '../infrastructure/api-platform';
import { TArgsNavigate, useNavigate } from '../hooks/use-navigate';
import { GoBack } from '../infrastructure/confirm-modal/go-back';
import { modalStyles } from '../infrastructure/confirm-modal/confirm.styles';
import { ETitlesUser } from '../users/const/titles';
import { ETitles } from '../infrastructure/confirm-modal/const/titles';
import { MainTitles } from '../const/titles-main';
import { AuthContext } from '../infrastructure/context/auth-context';

type THeader = (props: StackHeaderProps) => ReactNode;

export const Header: THeader = ({ route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleEntityCreate, setModalVisibleEntityCreate] = useState(false);
  const [isModalVisibleLogout, setModalVisibleLogout] = useState(false);

  const { goTo } = useNavigate<TMember>();
  const { logout } = useContext(AuthContext);

  const toggleModalEntityCreate = (): void => {
    setModalVisibleEntityCreate(!isModalVisibleEntityCreate);
  };

  const toggleModalLogout = (): void => {
    setModalVisibleLogout(!isModalVisibleLogout);
  };

  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      {route.name !== ENavigationName.LOGIN_SCREEN ? (
        route.name !== ENavigationName.AUTHORIZATION ? (
          route.name !== ENavigationName.OPERATION_CONFIRM ? (
            <View style={{ backgroundColor: '#121212' }}>
              <View style={styles.headerContainer}>
                <View style={styles.rowContainer}>
                  <TouchableOpacity onPress={toggleModal}>
                    <View style={styles.burgWrap}>
                      <Image source={require('../../public/images/menuIco.png')} style={styles.menuIco} />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.logoContainer}>
                    <Text style={styles.innerText2}>ACKK</Text>
                  </View>

                  <View style={styles.avatar}>
                    <Pressable style={{ marginLeft: 30 }} onPress={toggleModalEntityCreate}>
                      <Image source={require('../../public/images/addItem2.png')} style={styles.addItemWrap} />
                    </Pressable>
                  </View>
                </View>
                <Modal
                  animationIn="slideInLeft"
                  animationOut="slideOutLeft"
                  animationInTiming={200}
                  animationOutTiming={200}
                  onBackdropPress={toggleModal}
                  isVisible={isModalVisible}
                >
                  <View style={styles.SideMenuContainer}>
                    <View style={styles.ContentContainer}>
                      <View style={styles.LogoContainer}>
                        <Image source={require('../../public/images/ASALogo.png')} style={styles.LogoImg} />
                        <Text style={styles.LogoText}>АС КК</Text>
                      </View>
                    </View>
                    <View style={styles.BtnContainer1}>
                      <Image source={require('../../public/images/building.png')} style={styles.BtnIco1} />
                      <TouchableHighlight
                        onPress={(): void => {
                          const argsNavigateTo: TArgsNavigate<TMember> = {
                            route: ENavigationName.CHOOSE_BUILDING,
                            params: {},
                          };
                          goTo(argsNavigateTo);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.BtnText1}>Вибір будівлі</Text>
                      </TouchableHighlight>
                    </View>

                    <View style={styles.BtnContainer1}>
                      <Image source={require('../../public/images/home.png')} style={styles.BtnIco1} />
                      <TouchableHighlight
                        onPress={(): void => {
                          const argsNavigateTo: TArgsNavigate<TMember> = {
                            route: ENavigationName.HOME,
                            params: {},
                          };
                          goTo(argsNavigateTo);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.BtnText1}>Головна</Text>
                      </TouchableHighlight>
                    </View>

                    <View style={styles.BtnContainer1}>
                      <Image source={require('../../public/images/scanner.png')} style={styles.BtnIco1} />
                      <TouchableHighlight
                        onPress={(): void => {
                          const argsNavigateTo: TArgsNavigate<TMember> = {
                            route: ENavigationName.SCAN,
                            params: {},
                          };
                          goTo(argsNavigateTo);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.BtnText1}>Сканер</Text>
                      </TouchableHighlight>
                    </View>

                    <View style={styles.defaultBorder} />
                    <View style={styles.BtnContainer2}>
                      <Image
                        source={{
                          uri: 'https://cdn.discordapp.com/attachments/466314747281801228/826333483114430494/unknown.png',
                        }}
                        style={styles.BtnIco2}
                      />
                      <TouchableHighlight
                        onPress={(): void => {
                          setModalVisibleLogout(true);
                        }}
                      >
                        <Text style={styles.BtnText2}>Вийти</Text>
                      </TouchableHighlight>
                    </View>

                    <View style={{ marginTop: '60%' }}>
                      <View style={styles.defaultBorder} />
                      <View style={styles.flex}>
                        <Image
                          source={{
                            uri: 'https://cdn.discordapp.com/attachments/466314747281801228/827141915459584000/unknown.png',
                          }}
                          style={styles.foterIco}
                        />
                        <Text style={styles.footerText}>
                          {' '}
                          Developed by ASA {'\n'} Engineering {'\n'} {'\n'} Application version: Alpha 1.0
                        </Text>
                      </View>
                    </View>
                  </View>
                </Modal>

                <Modal
                  animationIn="slideInRight"
                  animationOut="slideOutRight"
                  animationInTiming={200}
                  animationOutTiming={200}
                  onBackdropPress={toggleModalEntityCreate}
                  isVisible={isModalVisibleEntityCreate}
                >
                  <View style={styles.attItemContainer}>
                    <TouchableHighlight
                      onPress={(): void => {
                        const argsNavigateTo: TArgsNavigate<TMember> = {
                          route: ENavigationName.CREATE_COMPONENT,
                          params: {},
                        };
                        goTo(argsNavigateTo);
                        setModalVisibleEntityCreate(false);
                      }}
                    >
                      <Image source={require('../../public/images/componentsIco.png')} style={styles.btnAddItem} />
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={(): void => {
                        const argsNavigateTo: TArgsNavigate<TMember> = {
                          route: ENavigationName.CREATE_MIXING,
                          params: {},
                        };
                        goTo(argsNavigateTo);
                        setModalVisibleEntityCreate(false);
                      }}
                    >
                      <Image source={require('../../public/images/mixingIco.png')} style={styles.btnAddItem} />
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={(): void => {
                        const argsNavigateTo: TArgsNavigate<TMember> = {
                          route: ENavigationName.CREATE_TZP_DETAIL_SAMPLE,
                          params: {},
                        };
                        goTo(argsNavigateTo);
                        setModalVisibleEntityCreate(false);
                      }}
                    >
                      <Image
                        source={require('../../public/images/pressFormTZPBodyIco.png')}
                        style={styles.btnAddItem}
                      />
                    </TouchableHighlight>
                    <Image
                      source={require('../../public/images/ui-element.png')}
                      style={{
                        width: 40,
                        height: 40,
                        margin: 15,
                      }}
                    />
                  </View>
                </Modal>

                <Modal
                  animationInTiming={200}
                  animationOutTiming={200}
                  onBackdropPress={toggleModalLogout}
                  isVisible={isModalVisibleLogout}
                >
                  <View style={modalStyles.modalBack}>
                    <View style={{ margin: 10 }}>
                      <Text style={modalStyles.modalTitle}>{ETitles.CONFIRM_MOVE}</Text>
                      <Text style={modalStyles.modalText}>{ETitlesUser.LOGOUT}</Text>
                      <View style={modalStyles.modalContainer}>
                        <View
                          style={{
                            marginLeft: -40,
                            marginRight: 10,
                          }}
                        >
                          <GoBack />
                        </View>

                        <TouchableHighlight
                          onPress={(): void => {
                            logout();
                          }}
                        >
                          <View style={modalStyles.btnContainerPurple}>
                            <Text style={modalStyles.btnTitle}>{MainTitles.YES}</Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          ) : null
        ) : null
      ) : null}
    </>
  );
};
