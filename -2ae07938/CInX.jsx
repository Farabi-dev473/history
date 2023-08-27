import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Badge, Button, Checkbox, Container, Dropdown, Loading, Text, Tooltip } from "@nextui-org/react";
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineAppstoreAdd, AiOutlineSetting } from 'react-icons/ai';
import { CiSaveUp1 } from 'react-icons/ci';
import { FaRobot } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/auth';
import { CREATE_VERIFICATION_SETTING, SAVE_VERIFICATION_CHANGES } from '../gql/mutations';
import {
  GET_GUILDS_INFO, GET_VERIFICATION_RULES,
  SEND_TEST_MESSAGE_TO_CHANNEL
} from '../gql/queries';
import { useObjectState } from "../hooks";
import { ANY, RULE_FORM_FIELDS, SEPARATION_SIGN, prepareKey } from '../lib/constants';
import { generateRule } from '../lib/utils';
import DeleteRuleTooltip from './DeleteToolTip';
import GenerateRulesModal from './GenerateRulesModal';
import NotFoundLayout from './NotFoundLayout';
import Rule from './Rule';
import Spinner from './Spinner';
import MultiSelect from './input/MultiSelect';
import Select from './input/Select';
const { NFT_COUNT, COLLECTION, TRAIT_TYPE, TRAIT_VALUE, DISCORD_ROLE } = RULE_FORM_FIELDS

const initialState = {
  channels: [],
  roles: [],
  rules: [],
  verificationSetting: null,
  isOpenGenerateRulesModal: false,
}

export default function HolderVerification({ guilds, guild }) {
  const [state, setState] = useObjectState(initialState)
  const router = useRouter()
  const nonDeletedRules = useMemo(() => state.rules.filter(rule => !rule.deleted), [state.rules])
  const authContext = useAuthContext()
  const { discordUserId } = authContext.state

  const methods = useForm();

  const {
    handleSubmit,
    setValue,
    resetField,
  } = methods

  const { loading } = useQuery(GET_GUILDS_INFO, {
    variables: {
      guildId: guild.id
    },
    async onCompleted({
      getVerificationSetting: setting,
      getGuildRoles: roles,
      getGuildChannels: channels
    }) {
      if (setting) {
        setState({
          verificationSetting: {
            ...setting,
            channel: setting.channel ?? channels.at()
          },
          roles,
          channels
        })
        
        getVerificationRules({
          variables: {
            verificationSettingId: setting.id
          }
        })
      } else {
        setState({ verificationSetting: setting })
      }
    }
  })

  const [getVerificationRules, { loading: rulesLoading, client }] = useLazyQuery(GET_VERIFICATION_RULES, {
    onCompleted({ getVerificationRules: guildRules }) {
      const allRules = []
      const selectedRoleIdSet = new Set()

      guildRules = client.cache.readQuery({
        query: GET_VERIFICATION_RULES,
        variables: { verificationSettingId: state.verificationSetting.id }
      })?.getVerificationRules || guildRules

      for (const rule of guildRules) {
        const modifiedRule = {
          ...rule,
          deleted: false,
        }

        selectedRoleIdSet.add(rule[DISCORD_ROLE].id)
        allRules.push(modifiedRule)
        setRulesValue(modifiedRule)
      }

      setState({
        rules: allRules,
        roles: state.roles.map((role => ({ ...role, selected: selectedRoleIdSet.has(role.id) })))
      })
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  const [createVerificationSetting, { loading: creatingSetting }] = useMutation(CREATE_VERIFICATION_SETTING, {
    update(cache, { data: { createVerificationSetting: setting } }) {
      const prevGuildInfo = cache.readQuery({
        query: GET_GUILDS_INFO,
        variables: { guildId: setting.guildId }
      })

      cache.writeQuery({
        query: GET_GUILDS_INFO,
        variables: { guildId: setting.guildId },
        data: {
          ...prevGuildInfo,
          getVerificationSetting: setting
        },
        overwrite: true
      })
    },
    async onCompleted() {
      toast.success(`Setting created successfully for ${guild.name}`);
    },
    onError(err) {
      toast.error(err.message || 'Oops! Something went wrong.');
    },
  });

  const [saveVerificationChanges, { loading: savingSetting }] = useMutation(SAVE_VERIFICATION_CHANGES, {
    update(cache, { data }) {
      const {
        saveVerificationSetting: setting,
        saveVerificationRules: rules
      } = data

      cache.writeQuery({
        query: GET_VERIFICATION_RULES,
        variables: { verificationSettingId: setting.id },
        data: {
          getVerificationRules: rules
        },
        overwrite: true
      })

      const prevGuildInfo = cache.readQuery({
        query: GET_GUILDS_INFO,
        variables: { guildId: setting.guildId }
      })

      cache.writeQuery({
        query: GET_GUILDS_INFO,
        variables: { guildId: setting.guildId },
        data: {
          ...prevGuildInfo,
          getVerificationSetting: setting
        },
        overwrite: true
      })
    },
    async onCompleted({ deleteVerificationRules: deleteCount }) {
      deleteCount === 0
        ? toast.success('Setting saved successfully!')
        : toast.success(`Setting saved! deleted ${deleteCount} rule${deleteCount > 1 ? 's' : ''}`);
    },
    onError(err) {
      toast.error(err.message || 'Oops! Something went wrong.');
    },
  });

  const [sendTestMessageToChannel, { loading: sendTestMessageLoading }] = useLazyQuery(SEND_TEST_MESSAGE_TO_CHANNEL, {
    onCompleted({ sendTestMessageToChannel }) {
      sendTestMessageToChannel && toast.success('Test message sent successfully!')
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  const setRulesValue = (rule) => {
    const getByRuleKey = prepareKey(`${state.verificationSetting.id}${SEPARATION_SIGN}${rule.id}`)

    setValue(getByRuleKey(NFT_COUNT), rule[NFT_COUNT]);
    setValue(getByRuleKey(COLLECTION), rule[COLLECTION])

    if (rule[TRAIT_TYPE] === ANY) {
      setValue(getByRuleKey(TRAIT_TYPE), { trait: ANY, id: ANY });
      setValue(getByRuleKey(TRAIT_VALUE), { value: ANY, id: ANY });
    } else {
      setValue(getByRuleKey(TRAIT_TYPE), { trait: rule[TRAIT_TYPE], id: rule.traitTypeId });
      setValue(getByRuleKey(TRAIT_VALUE), { value: rule[TRAIT_VALUE], id: rule.traitValueId });
    }

    setValue(getByRuleKey(DISCORD_ROLE), rule[DISCORD_ROLE]);

    return rule
  }

  const addNewRuleHandler = () => {
    const newRule = setRulesValue(generateRule(state.verificationSetting.id, discordUserId))
    setState((prevState) => ({ rules: [newRule, ...prevState.rules] }))
  };

  const handleDeleteRule = (rule) => () => {
    // remove from the ui
    setState((prevState) => ({
      rules: prevState.rules.map((prevRule) => {
        if (prevRule.id === rule.id) {
          return {
            ...prevRule,
            deleted: true
          }
        }

        return prevRule
      }),
      roles: prevState.roles.map(role => {
        if (rule[DISCORD_ROLE]?.id === role.id) {
          role.selected = false
        }
        return role
      })
    }))

    const getByRuleKey = prepareKey(`${rule.verificationSettingId}${SEPARATION_SIGN}${rule.id}`)

    // remove from the form state
    Object.values(RULE_FORM_FIELDS).forEach(ruleKey => {
      resetField(getByRuleKey(ruleKey))
    })
  }

  const onSubmit = async (input) => {
    const { id, channel, moderatorRoles, notifyHolder } = state.verificationSetting
    const settingInfo = {
      id,
      channel: {
        id: channel.id,
        name: channel.name
      },
      notifyHolder,
      moderatorRoles: moderatorRoles?.map(role => ({ id: role.id, name: role.name })),
      guildId: guild.id
    };

    const ruleFields = Object.values(RULE_FORM_FIELDS)
    const ruleKeys = Object.keys(input)
      .filter(ruleFormKey => ruleFormKey.startsWith(settingInfo.id) && ruleFields.some(fromKey => ruleFormKey.endsWith(fromKey)))
    // .filter(ruleKey => getFieldState(ruleKey, methods.formState).isDirty) // TODO: only update those keys were changed

    const { deletedRules, existingRules } = state.rules.reduce((acc, rule) => {
      if (rule.deleted) {
        acc.deletedRules.push(rule.id)
      } else {
        acc.existingRules.push(rule)
      }
      return acc
    }, { deletedRules: [], existingRules: [] })

    const currentRulesMap = existingRules.reduce((map, rule) => map.set(rule.id, rule), new Map())
    const verificationRulesMap = new Map()

    for (const ruleKey of ruleKeys) {
      const [, id, field] = ruleKey.split(SEPARATION_SIGN)

      if (ruleFields.includes(field) && currentRulesMap.has(id)) {
        const { id: memberId } = currentRulesMap.get(id).createdBy
        if (!verificationRulesMap.has(id)) {
          verificationRulesMap.set(id, {
            id,
            verificationSettingId: state.verificationSetting.id,
            createdBy: { id: memberId },
            createdAt: currentRulesMap.get(id).createdAt
          })
        }

        const rule = verificationRulesMap.get(id)

        switch (field) {
          case NFT_COUNT:
            rule[field] = Number(input[ruleKey]);
            break
          case COLLECTION: {
            const collection = input[ruleKey]
            rule.collection = {
              id: collection.id,
              name: collection.name,
              slug: collection.slug,
              imageUrl: collection.imageUrl,
              currency: collection.currency,
              blockchainSlug: collection.blockchainSlug
            }
            break
          }
          case TRAIT_TYPE:
            rule[field] = input[ruleKey]?.trait;
            rule['traitTypeId'] = input[ruleKey]?.id;
            break;
          case TRAIT_VALUE:
            rule[field] = input[ruleKey]?.value;
            rule['traitValueId'] = input[ruleKey]?.id;
            break;
          case DISCORD_ROLE: {
            const role = input[ruleKey]

            rule[field] = {
              id: role.id,
              name: role.name
            };
          }
        }
      }
    }

    // save & delete updated setting and rules
    saveVerificationChanges({
      variables: {
        settingId: settingInfo.id,
        settingToUpdate: settingInfo,
        rulesToUpdate: Array.from(verificationRulesMap.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
        ruleIdsToDelete: deletedRules
      },
    });
  };

  const sendTestMessage = () => {
    const channelId = state.verificationSetting?.channel?.id

    if (channelId) {
      sendTestMessageToChannel({
        variables: {
          channelId
        },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'no-cache',
      })
    } else {
      toast.error('No channel selected yet!')
    }
  }

  const openGenerateRulesModal = () => setState({ isOpenGenerateRulesModal: true })
  const closeGenerateRulesModal = () => setState({ isOpenGenerateRulesModal: false })
  const hasRules = Boolean(nonDeletedRules.length)
  const hasSetting = Boolean(state.verificationSetting?.id)

  let setting;

  if (loading) {
    setting = <Spinner size="xl" />
  } else {
    setting = (
      <Container className='py-5'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="block space-y-7 align-center w-full"
        >
          <section className={clsx("grid gap-3 items-center grid-cols-6 ", guild?.isGuildOwner && "grid-cols-7")}>
            <div className="w-full">
              <label
                htmlFor="name"
                className="inline-flex text-sm font-bold text-gray-200"
              >
                Discord sever
              </label>
              <Select
                onChange={(e) => router.push({
                  pathname: '/dashboard/hvb',
                  query: { guild_id: e.id },
                })}
                value={guild}
                guildValues={guilds}
              />
            </div>

            {
              hasSetting && (
                <>
                  <div className="w-full relative">
                    <label
                      htmlFor="name"
                      className="inline-flex text-sm font-bold text-gray-200"
                    >
                      Channel
                    </label>
                    <Select
                      onChange={(e) => setState(prev => ({ verificationSetting: { ...prev.verificationSetting, channel: e } }))}
                      value={state.verificationSetting.channel}
                      guildValues={state.channels}
                      textValue="Select channel"
                    />
                  </div>

                  {guild?.isGuildOwner && (
                    <div className="w-full">
                      <label
                        htmlFor="name"
                        className="inline-flex text-sm font-bold text-gray-200"
                      >
                        Moderators
                      </label>
                      <MultiSelect
                        label="Select roles"
                        onChange={(e) => setState(prev => ({ verificationSetting: { ...prev.verificationSetting, moderatorRoles: e } }))}
                        selectedItems={state.verificationSetting.moderatorRoles ?? []}
                        items={state.roles}
                      >
                        {(item) => (
                          <>
                            <Badge variant="dot" size="lg" css={{ backgroundColor: item.hexColor }} />
                            <span className='ml-1.5 truncate'>{item.name}</span>
                          </>
                        )}
                      </MultiSelect>
                    </div>
                  )}

                  <div className="col-span-4 flex ml-auto mt-auto space-x-3">
                    {hasRules && (
                      <Button
                        auto
                        className='!font-semibold'
                        onPress={addNewRuleHandler}
                        icon={<AiOutlineAppstoreAdd size="1.5em" />}
                        disabled={state.rules.length > 250}
                      >
                        Add Rule
                      </Button>
                    )}

                    <Dropdown>
                      <Dropdown.Button className="!font-semibold">
                        Actions
                      </Dropdown.Button>
                      <Dropdown.Menu aria-label="Actions" onAction={(key) => {
                        switch (key) {
                          case 'send-test-message':
                            return sendTestMessage()
                          case 'generate-rules':
                            return openGenerateRulesModal()
                        }
                      }}>
                        <Dropdown.Item
                          key="send-test-message"
                          description="Send a test message to channel"
                          icon={
                            sendTestMessageLoading ? <Loading size='sm' /> : <IoIosSend size={22} fill="var(--nextui-colors-primary)" />
                          }
                          textValue='send test message'
                        >
                          Send test message
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="generate-rules"
                          description="Allows you to generate rules"
                          textValue='generate rules'
                          icon={
                            <FaRobot size={22} fill="var(--nextui-colors-primary)" />
                          }
                        >
                          Generate rules
                        </Dropdown.Item>
                        <Dropdown.Item
                          withDivider
                          key="notify-holder"
                          textValue='notify holder'
                        >
                          <Checkbox
                            size="sm"
                            isSelected={state.verificationSetting.notifyHolder}
                            onChange={(e) => setState(prev => ({ verificationSetting: { ...prev.verificationSetting, notifyHolder: e } }))}
                            className='!w-full'
                          >
                            Notify holder
                          </Checkbox>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Button
                      type='submit'
                      auto
                      className='!font-semibold'
                      icon={savingSetting ? <Loading size='sm' /> : <CiSaveUp1 size="1.5em" />}
                      disabled={savingSetting}
                    >
                      Save Changes
                    </Button>
                  </div>
                </>
              )
            }
          </section>

          {hasSetting && hasRules ? (
            <section className={'flex flex-col rounded-md py-7 px-3 mx-auto relative bg-[#13131A8A] border border-[#252330ED]'}>
              {rulesLoading ?
                <Spinner type="points" /> : Boolean(state.verificationSetting) && (
                  <ul className='space-y-5 !m-0 px-3'>
                    {nonDeletedRules.map((rule) => (
                      <Rule
                        key={rule.id}
                        rule={rule}
                        methods={methods}
                        rolesValues={state.roles}
                        setParentState={setState}
                      >
                        {({ visibleTooltip, setTooltipVisibility }) => (
                          <Tooltip
                            trigger="click"
                            shadow={true}
                            visible={visibleTooltip}
                            className='mt-2.5'
                            offset={2}
                            portalClassName="border border-[#252330ED]"
                            content={
                              <DeleteRuleTooltip
                                closeTooltipHandler={() => setTooltipVisibility(false)}
                                deleteHandler={handleDeleteRule(rule)}
                              />
                            }
                          >
                            <button
                              type="button"
                              className="ml-2 mt-4"
                              onClick={() => setTooltipVisibility(true)}
                            >
                              <RiDeleteBin6Fill size={'1.5em'} fill="var(--nextui-colors-error)" />
                            </button>
                          </Tooltip>
                        )}
                      </Rule>
                    ))}
                  </ul>
                )
              }
            </section>
          ) : (
            <NotFoundLayout className="rounded-md border border-[#252330ED] bg-[#13131A8A] focus:outline-none">
              {hasSetting && state.rules.length === 0 && <Text size="$2xl" h1>No rules have been added yet!</Text>}
              {!hasSetting && <Text size="$2xl" h1>No setting found for this guild!</Text>}

              {hasSetting ? (
                <Button
                  auto
                  className='!font-semibold'
                  onPress={addNewRuleHandler}
                  icon={<AiOutlineAppstoreAdd size="1.5em" />}
                >
                  Add New Rule
                </Button>
              ) : (
                <Button
                  auto
                  type="button"
                  icon={creatingSetting ? <Loading size='sm' /> : <AiOutlineSetting size="1.5em" />}
                  className="!font-semibold"
                  disabled={creatingSetting}
                  onPress={() => createVerificationSetting({ variables: { guildId: guild.id } })}
                >
                  Create New Setting
                </Button>
              )}
            </NotFoundLayout>
          )
          }
        </form>

        <button>
        <GenerateRulesModal
          guildId={guild.id}
          settingId={state.verificationSetting?.id}
          isOpenModal={state.isOpenGenerateRulesModal}
          closeModal={closeGenerateRulesModal}
          guildRoles={state.roles}
          addRuleToForm={setRulesValue}
          setRules={(getRules) => setState((prevState) => ({ rules: getRules(prevState.rules) }))}
        />
        </button>
      </Container>
    )
  }

  return setting
}
