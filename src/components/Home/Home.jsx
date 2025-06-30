import React from 'react';

import { Section1 } from './Section1';
import { OurObjectives } from './OurObjectives';
import { UsersSection } from './UsersSection';
import { UniqueFeatures } from './UniqueFeatures';
import { OurValues } from './OurValues';

export const Home = () => {
    return (
    <div>
        <Section1/>
        <OurObjectives/>
        <UsersSection/>
        <UniqueFeatures/>
        <OurValues/>
    </div>
    )
};

