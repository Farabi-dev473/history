// external imports
import dotenv from 'dotenv';
import axios from 'axios';
// internal imports
import axiosProxyConfigs from './configs/axiosProxyConfigs.js';
import axiosConfigs from './configs/axiosConfigs.js';
console.log(axiosProxyConfigs, axiosConfigs);
dotenv.config();
const getTwitterSpaceData = async (spaceId) => {
    const url = `https://twitter.com/i/api/graphql/SZf3Ceycp2dG7rrjd4oorg/AudioSpaceById?variables=%7B%22id%22%3A%22${spaceId}%22%2C%22isMetatagsQuery%22%3Afalse%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withReplays%22%3Atrue%7D&features=%7B%22spaces_2022_h2_clipping%22%3Atrue%2C%22spaces_2022_h2_spaces_communities%22%3Atrue%2C%22blue_business_profile_image_shape_enabled%22%3Afalse%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Afalse%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22longform_notetweets_richtext_consumption_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
    console.log("Hello");
    const response = await axios.get(url, {
        proxy: axiosProxyConfigs,
        ...axiosConfigs
    });
    if (!response?.data)
        throw new Error("Space Id was invalid");
    const { data: { audioSpace: { participants } } } = response.data;
    const admin = participants?.admins[0];
    const coHosts = participants?.admins?.shift();
    const speakers = participants?.speakers;
    const listeners = participants?.listeners;
    console.log('Admin: ', admin?.display_name);
    console.log('Co-Hosts', coHosts.map((coHost) => {
        return coHost.display_name;
    }));
    console.log('Speakers', speakers.map((speaker) => {
        return speaker.display_name;
    }));
    console.log('Listeners', listeners.map((listener) => {
        return listener.display_name;
    }));
    return {
        admin,
        coHosts,
        speakers,
        listeners
    };
};
const main = async () => {
    await getTwitterSpaceData('1gqGvypgnokKB');
};
main()
