import {routes} from '@/navigation';
import {ParamListBase} from '@react-navigation/native';

export type TRouteNames = (typeof routes)[number]['name'] & ParamListBase;

export default TRouteNames;
