import React from "react";
import styled from "styled-components";
import { PancakeRoundIcon, PancakeRoundIcon2, PancakeRoundIcon3, CogIcon, SvgProps } from "../../../components/Svg";
import Text from "../../../components/Text/Text";
import Flex from "../../../components/Box/Flex";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Link from "../../../components/Link/Link";
import Skeleton from "../../../components/Skeleton/Skeleton";
import Button from "../../../components/Button/Button";
import IconButton from "../../../components/Button/IconButton";
import MenuButton from "./MenuButton";
import * as IconModule from "../icons";
import { PanelProps, PushedProps } from "../types";
import { socials, MENU_ENTRY_HEIGHT } from "../config";

interface Props extends PanelProps, PushedProps {}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const {MoonIcon, SunIcon, LanguageIcon} = Icons;

const Container = styled.div`
  flex: none;
  padding: 8px 4px;
  background-color: ${({ theme }) => theme.nav.background};
  border-top: solid 2px rgba(133, 133, 133, 0.1);
`;

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const SettingsEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 8px;
`;

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 16px;
`;

const PanelFooter: React.FC<Props> = ({
  isPushed,
  pushNav,
  toggleTheme,
  isDark,
  cakePriceUsd,
  mintPriceUsd,
  teasportPriceUsd,
  currentLang,
  langs,
  setLang,
  priceLink,
}) => {
  if (!isPushed) {
    return (
      <Container>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container>
      <SocialEntry>
        {cakePriceUsd ? (
            <PriceLink href={priceLink} target="_blank">
                <PancakeRoundIcon width="22px" mr="4px"/>
                <Text color="textSubtle" mr="4px" bold>{`$${cakePriceUsd.toFixed(2)}`}</Text>
            </PriceLink>
        ) : (
            <Skeleton width={80} height={24}/>
        )}
        {mintPriceUsd ? (
            <PriceLink href={priceLink} target="_blank">
                <PancakeRoundIcon2 width="22px" mr="4px"/>
                <Text color="textSubtle" mr="4px" bold>{`$${mintPriceUsd.toFixed(2)}`}</Text>
            </PriceLink>
        ) : (
            <Skeleton width={80} height={24}/>
        )}
        {teasportPriceUsd ? (
            <PriceLink href={priceLink} target="_blank">
                <PancakeRoundIcon3 width="22px" mr="4px"/>
                <Text color="textSubtle" mr="4px" bold>{`$${teasportPriceUsd.toFixed(2)}`}</Text>
            </PriceLink>
        ) : (
            <Skeleton width={80} height={24}/>
        )}
      </SocialEntry>
      <SocialEntry>
          <Flex>
              {socials.map((social, index) => {
                  const Icon = Icons[social.icon];
                  const iconProps = {width: "24px", color: "textSubtle", style: {cursor: "pointer"}};
                  const mr = index < socials.length - 1 ? "32px" : 0;
                  if (social.items) {
                      return (
                          <Dropdown key={social.label} position="top" target={<Icon {...iconProps} mr={mr}/>}>
                              {social.items.map((item) => (
                                  <Link external key={item.label} href={item.href} aria-label={item.label}
                                        color="textSubtle">
                                      {item.label}
                                  </Link>
                              ))}
                          </Dropdown>
                      );
                  }
                  return (
                      <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
                          <Icon {...iconProps} />
                      </Link>
                  );
              })}
          </Flex>
      </SocialEntry>
      <SettingsEntry>
          <Button variant="text" onClick={() => toggleTheme(!isDark)}>
              {/* alignItems center is a Safari fix */}
              <Flex alignItems="center">
                  <SunIcon color={isDark ? "textDisabled" : "text"} width="24px"/>
                  <Text color="textDisabled" mx="4px">
                      /
                  </Text>
                  <MoonIcon color={isDark ? "text" : "textDisabled"} width="24px"/>
              </Flex>
          </Button>
      </SettingsEntry>
    </Container>
  );
};

export default PanelFooter;
