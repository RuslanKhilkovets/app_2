import StartScreen from "../screens/StartScreen";
import StartSliderScreen from "../screens/StartSliderScreen";

export const routes = [
    { name: "StartSlider", component: StartSliderScreen, options: { headerShown: false}}, 
    { name: "Start", component: StartScreen, options: { headerShown: false}}, 
]

export default routes;