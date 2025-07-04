import React from 'react';

import { Section1 } from './Section1/Section1';
import { OurObjectives } from './OurObjectives/OurObjectives';
import { UsersSection } from './UsersSection/UsersSection';
import { UniqueFeatures } from './UniqueFeatures/UniqueFeatures';
import { OurValues } from './OurValues/OurValues';

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

