import React from 'react';
import SuperInputText from '../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import SuperCheckbox from '../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox';
import SuperEditableSpan from '../../n1-main/m1-ui/common/c4-SuperEditableSpan/SuperEditableSpan';
import SuperSelect from '../../n1-main/m1-ui/common/c5-SuperSelect/SuperSelect';
import SuperRadio from '../../n1-main/m1-ui/common/c6-SuperRadio/SuperRadio';
import SuperRange from '../../n1-main/m1-ui/common/c7-SuperRange/SuperRange';
import SuperDebouncedInput from '../../n1-main/m1-ui/common/c8-SuperDebouncedInput/SuperDebouncedInput';

export const Test = () => {
    return (
        <div>
            test
            <SuperInputText/>
            <SuperButton/>
            <SuperCheckbox/>
            <SuperEditableSpan/>
            <SuperSelect/>
            <SuperRadio/>
            <SuperRange/>
            <SuperDebouncedInput/>
            {/*<SuperPagination/>*/}
            {/*<SuperSort/>*/}
        </div>
    );
};