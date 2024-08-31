import {
    Box, Button,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    StackProps,
    Text,
    VStack,
} from "@chakra-ui/react";
import {
    ButtonLink,
    ButtonLinkProps,
} from "src/landingpage/components/button-link/button-link";
import { BackgroundGradient } from "src/landingpage/components/gradients/background-gradient";
import { Section, SectionProps, SectionTitle } from "src/landingpage/components/section";
import React from "react";
import { FiCheck } from "react-icons/fi";
import { FiDollarSign, FiUserPlus } from "react-icons/fi";
import {useAuth} from "@app/features/common/hooks/use-auth"; // New icons

export interface UserBoxProps extends SectionProps {
    title: string;
    description: React.ReactNode;
    features: Array<UserFeatureProps | null>;
    action: ButtonLinkProps & { label?: string };
    isHighlighted?: boolean;
}

export interface UserProps extends SectionProps {
    lenders: UserBoxProps;
    borrowers: UserBoxProps;
}

export const UserSection: React.FC<UserProps> = (props) => {
    const { lenders, borrowers, ...rest } = props;

    return (
        <Section id="users" pos="relative" {...rest}>
            <BackgroundGradient height="100%" />
            <Box zIndex="2" pos="relative">
                <SectionTitle title="Join the Open Lending Movement" description="Discover how you can participate as a Lender or Borrower and transform education finance." />

                <SimpleGrid columns={[1, null, 2]} spacing={4}>
                    <UserBox {...lenders} />
                    <UserBox {...borrowers} />
                </SimpleGrid>
            </Box>
        </Section>
    );
};

const UserBox: React.FC<UserBoxProps> = (props) => {
    const {logIn} = useAuth();
    const { title, description, features, action, isHighlighted, ...rest } = props;
    return (
        <VStack
            zIndex="2"
            bg="whiteAlpha.600"
            borderRadius="md"
            p="8"
            flex="1 0"
            alignItems="stretch"
            border="1px solid"
            borderColor="gray.400"
            _dark={{
                bg: "blackAlpha.300",
                borderColor: "gray.800",
            }}
            {...(isHighlighted ? { borderColor: "primary.500" } : {})}
            {...rest}
        >
            <Heading as="h3" size="md" fontWeight="bold" fontSize="lg" mb="2">
                {title}
            </Heading>
            <Box color="muted">{description}</Box>
            <UserFeatures>
                {features.map((feature, i) =>
                    feature ? <UserFeature key={i} {...feature} /> : <br key={i} />
                )}
            </UserFeatures>
            <Button colorScheme="primary" onClick={logIn}>
                {action.label || "Learn More"}
            </Button>
        </VStack>
    );
};

const UserFeatures: React.FC<React.PropsWithChildren<React.ReactNode>> = ({ children }) => {
    return (
        <VStack align="stretch" justifyContent="stretch" spacing="4" mb="8" mt="2" flex="1">
            {children}
        </VStack>
    );
};

export interface UserFeatureProps {
    title: React.ReactNode;
    iconColor?: string;
}

const UserFeature: React.FC<UserFeatureProps> = (props) => {
    const { title, iconColor = "primary.500", highlight, highlightLink } = props;
    return (
        <HStack>
            <Icon as={FiCheck} color={iconColor} />
            <Text flex="1" fontSize="sm">
                {title}
                {highlight && highlightLink ? (
                    <Text as="a" href={highlightLink} textDecoration="underline" target="_blank" rel="noopener noreferrer">
                        {highlight}
                    </Text>
                ) : (
                    <Text as="span" fontWeight="bold">
                        {highlight}
                    </Text>
                )}
            </Text>
        </HStack>
    );
};

// Usage example with new unique names

const LenderBox = {
    id: "lender",
    title: "Education Investor",
    description: "Maximize your impact and returns by investing in the future of education. Ensure your funds are secure and impactful with Open Campus ID.",
    features: [
        { title: "Maximize Your Returns", iconColor: "purple.500" },
        { title: "Shape the Future", iconColor: "purple.500" },
        { title: "Customizable Investments", iconColor: "purple.500" },
        { title: "Diversify Your Portfolio", iconColor: "purple.500" },
        { title: "Build a Legacy", iconColor: "purple.500" },
        {
            title: "Transparency and Security with ",
            highlight: "Open Campus ID",
            highlightLink: "https://id.opencampus.xyz/",  // Adding the link
            iconColor: "purple.500"
        },
    ],
    action: { href: "/dashboard", label: "Start Investing" },
    isHighlighted: true,
};



const BorrowerBox = {
    id: "borrower",
    title: "Future Scholar",
    description: "Secure the funding you need to pursue your educational goals with ease.",
    features: [
        { title: "Low-Interest Rates", iconColor: "purple.500" },
        { title: "No Credit Check Required", iconColor: "purple.500" },
        { title: "Fast Approval Process", iconColor: "purple.500" },
        { title: "Empower Your Growth", iconColor: "purple.500" },
        { title: "Transparent Terms", iconColor: "purple.500" },
    ],
    action: { href: "/dashboard", label: "Get Funded" },
};


const UserSectionComponent = () => {
    return <UserSection id="use-benefits" lenders={LenderBox} borrowers={BorrowerBox} />;
};

export default UserSectionComponent;
