import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export default function cn(...args: classNames.ArgumentArray) {
    return twMerge(classNames(...args));
}
