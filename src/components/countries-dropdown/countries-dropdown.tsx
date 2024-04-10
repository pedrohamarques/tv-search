import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { styles as GlobalStyles } from "@themes/index";

import { COUNTRIES } from "@constants/countries";

import { CountryProps } from "@typings/constants";

type CountriesDropdownProps = {
    testID?: string;
    onItemPress: (item: CountryProps) => void;
    country: CountryProps | null;
};

export function CountriesDropDown({
    testID = "components.countries-dropdown",
    onItemPress,
    country,
}: CountriesDropdownProps) {
    return (
        <View>
            <Text className='text-yellow-500 font-bold pl-2 mt-2'>Country</Text>
            <Dropdown
                style={styles.dropdown}
                containerStyle={styles.container}
                selectedTextStyle={styles.selectedTextStyle}
                maxHeight={200}
                value={country}
                data={COUNTRIES}
                valueField='code'
                labelField='name'
                dropdownPosition='top'
                mode='default'
                activeColor={GlobalStyles.background.backgroundColor}
                onChange={({ name, code }) => onItemPress({ name, code })}
                testID={testID}
                itemTextStyle={styles.itemText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        height: 60,
        width: "100%",
        marginVertical: 8,
        padding: 8,
        paddingLeft: 16,
        borderRadius: 8,
        borderColor: "rgba(55, 65, 81, 1)",
        backgroundColor: "rgba(3,7, 18, 1)",
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
        color: "white",
        fontWeight: "700",
    },
    container: {
        backgroundColor: "rgba(55, 65, 81, 1)",
        maxHeight: 300,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 0,
    },
    itemText: {
        color: "white",
        fontWeight: "600",
    },
});
