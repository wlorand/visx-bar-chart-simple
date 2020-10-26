import React from 'react';

// visx packages
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { Group } from '@visx/group';

// visx mock data
import { letterFrequency as data } from '@visx/mock-data';
// log the data for confirmation
console.log(`data is: ${JSON.stringify(data)}`);

// define d3 margin convention
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

// define data accessor functions (usu inline in trad d3)
const xAccessor = (d) => d.letter;
const yAccessor = (d) => +d.frequency * 100; // quick cast to number

function BarChart({ width, height }) {
  // define chart bounds (leaving margin for axes)
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  console.log([xMax, yMax]);

  // define scales that move from data domain to pixel range for rendering
  const xScale = scaleBand({
    domain: data.map(xAccessor),
    range: [0, xMax],
    round: true,
    padding: 0.4,
  });
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(yAccessor))],
    range: [yMax, 0],
    round: true,
  });

  // Compose together the scale and accessor functions to get point functions (functional prog 101)
  const composeFxn = (scale, accessor) => (data) => scale(accessor(data));
  const xPoint = composeFxn(xScale, xAccessor);
  const yPoint = composeFxn(yScale, yAccessor);

  return (
    <svg width={width} height={height} className="chart-svg">
      <Group top={margin.top} left={margin.left}>
        {/* map over the data */}
        {data.map((d, i) => {
          const barHeight = yMax - yPoint(d);
          return (
            <Group key={`bar-${i}`}>
              <Bar
                x={xPoint(d)}
                y={yMax - barHeight}
                width={xScale.bandwidth()}
                height={barHeight}
                fill="#FC2e1c"
              />
            </Group>
          );
        })}
      </Group>
    </svg>
  );
}

export default BarChart;
