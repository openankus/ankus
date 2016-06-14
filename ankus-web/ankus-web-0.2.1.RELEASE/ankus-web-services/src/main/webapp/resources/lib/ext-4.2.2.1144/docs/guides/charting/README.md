# Charts

Charts are used to present data visually,
usually showing the relationship between different parts of the data.

The chart classes use the surfaces and sprites developed with
[the drawing package](#!/guide/drawing).
This means they are implemented using
standard graphics libraries: SVG, Microsoft VML, or HTML5 Canvas.

Every chart must have three components: data, axes, and series.

**Data** is the information to be depicted in the chart.
For the Sencha frameworks,
this is represented using the standard Model/Store paradigm.

**Axes** provide the origin, range, scale, and units of the data.
form the basic "infrastructure" of the chart.
Axes can be Cartesian (x,y), Polar (or radial)
or Gauge (one-dimensional axis used for a gauge chart).
Most charts use one set of axes
although a chart that combines multiple types of series
may require additional axes definitions.

**Series** is the term used for the graphical rendering of the data.
In other words, these are the essential graphical item(s)
in a chart such as a line, bars, columns, or the pie.
One chart may include several series.
For example, a chart with three lines on it
contains three independent line series.
another chart might include three bar series
plus a line series.

Additional facilities let you add labels, markers, and legends to a Chart;
do animations so that Chart elements
(bars, columns, lines, pie slices)
move rather than sitting statically on the display;
and zoom in on a section of a series to show more detail.

- A **label** gives explanatory titles for an axis or a series.

- A **marker** is a symbol, shape, or picture that is used
to plot a data point in a series.

- A **legend** provides a key to the chart,
identifying the the variables in the chart
and how they are represented.

- **listeners** are software that wait for and act on
actions such as mouse events on the desktop
and tap events on touchscreen devices.

- **animation** -- is movement that is applied to chart elements.

See the [Charts examples](http://docs.sencha.com/products/extjs/#!/sample-4)
for a quick overview of the sorts of charts that can be implemented
with the Charting APIs.
We will refer to these examples frequently in this guide;
you can see what each chart looks like
and then view the code used to produce the chart.
Note the following:

- These examples work best when your browser's zoom
is set to 100% or less.
If you click on an example and the chart overlays the text,
reset the zoom ration on your browser
and reload the example chart.
- All Ext JS examples include a drop-down menu
that allows you to see the effect of different themes.
These are the standard CSS themes
that do not apply directly to the charting components.
However, some of the Chart examples
are implemented on an Ext JS container
that IS affected by the CSS themes.
You will note especially that charts
using the default (transparent) background
may look quite different displayed on the Accessibility or Aria
CSS Theme (which have a black background)
whereas charts that are styled to have a white (#fff) background
still have that white background when displayed
on a black CSS Theme background.

Colors use an HTML color code that defines the color to be used.
Colors are defined by their red-green-blue makeup;
the code can be #rgb for 16-bit codes
or #rrggbb for 256-bit codes;
for example, #317040 or #374 represent dark greens.
See the [Color Names](http://www.w3schools.com/html/html_colornames.asp)
web page for a chart that shows names for common colors
that are supported by all browsers
or use the [HTML Color Codes](http://html-color-codes.info) web page
to find the color code you want.
The latter page also includes useful hints
such as colors that work well on all operating systems
and colors that are safe for color blindness.

Text is used many ways in charts --
in legends, as labels, and so forth.
Text should be entered as a string;
you can specify stylings such as font, size, margins, and colors
with the coding for the chart component.
In some cases, HTML text may work
but it is less robust and Sencha does not guarantee
that HTML text will work in future releases.

## Creating a Simple Chart

Every chart has at least three key and independent parts:

- a {@link Ext.data.Model Model} that describes the data
and a {@link Ext.data.Store Store} that contains the data.
The data displayed in the chart is automatically updated
whenever the data in the Store changes.
- an array of {@link Ext.chart.axis.Axis Axes}
that define the boundaries of the chart.
- one or more {@link Ext.chart.series.Series Series}
to handle the visual rendering of the data points.
One chart can have a number of Series,
sharing the axes.

To create a simple chart, you must:

1. Define a Model and create a Store
1. Define the chart and provide basic configuration information,
which includes binding the chart to the Store.
1. Define the axes for the chart.
1. Define the Series for the chart.

### Defining a Model and Creating a Store

The first step is to create a {@link Ext.data.Model Model}
that represents the type of
data that will be displayed in the chart.
For example, the data for a chart that displays a weather forecast
could be represented as a series of "WeatherPoint" data points
with two fields - "temperature", and "date":

    Ext.define('WeatherPoint', {
        extend: 'Ext.data.Model',
        fields: [
             { name: 'temperature', type: 'int' }
             { name: 'date' }
        ]
    });

Note that `type: 'int'` is specified for each field;
this is not always necessary but is recommended.

Next, create a {@link Ext.data.Store Store}.
The Store contains a collection of "WeatherPoint" Model instances.
The data could be loaded dynamically,
but for sake of ease this example uses inline data:

    var store = Ext.create('Ext.data.Store', {
        model: 'WeatherPoint',
        data: [
            { temperature: 58, date: new Date(2013, 1, 1, 8) },
            { temperature: 63, date: new Date(2013, 1, 1, 9) },
            { temperature: 73, date: new Date(2013, 1, 1, 10) },
            { temperature: 78, date: new Date(2013, 1, 1, 11) },
            { temperature: 81, date: new Date(2013, 1, 1, 12) }
        ]
    });

For additional information about Models and Stores,
please refer to the [Data Guide](#!/guide/data).

### 2. Creating the Chart object

Now that a Store has been created it can be used in a Chart:

    Ext.create('Ext.chart.Chart', {
       renderTo: Ext.getBody(),
       width: 400,
       height: 300,
       store: store
    });

This defines the width and height of the chart (in pixels)
and specifies that the chart is rendered to the current document body
a returned by **Ext.getBody**.
Any specifications that can be used in a layout can be used here; see
[Layouts and Containers](#!/guides/layouts_and_containers)
for more information.

That is all it takes to create a Chart instance that is backed by a Store.
However, if the above code is run in a browser,
a blank screen is displayed.
This is because the two pieces that are responsible for the visual display --
the Chart's {@link Ext.chart.Chart#cfg-axes axes} and
{@link Ext.chart.Chart#cfg-series series} --
have not yet been defined.

### 3. Configuring the Axes

{@link Ext.chart.axis.Axis Axes} are the lines
that define the boundaries of the data points
that a Chart can display.
This chart uses the standard Cartesian axes
with the y axis defined as the Numeric type
and the x axis defined as the Time type,
which is a special type of Numeric type
that renders the numeric values as human-readable dates.
The vertical (left position) "y" axis is defined first
and has the title "Temperature";
the horizontal (bottom position) "x" axis is defined second
and has the title "Time":

    Ext.create('Ext.chart.Chart', {
        ...
        axes: [
            {
                title: 'Temperature',
                type: 'Numeric',
                position: 'left',
                fields: ['temperature'],
                minimum: 0,
                maximum: 100
            },
            {
                title: 'Time',
                type: 'Time',
                position: 'bottom',
                fields: ['date'],
                dateFormat: 'ga'
            }
        ]
    });

The "Temperature" axis is a vertical
{@link Ext.chart.axis.Numeric Numeric Axis}
and is positioned on the left edge of the Chart.
It represents the bounds of the data contained
in the "WeatherPoint" Model's "temperature" field
that was defined above.
The minimum value for this axis is 0, and the maximum is 100.
By defining the minimum value as 0,
you ensure that the scale is displayed beginning at 0
even if the lowest temperature reported is above 0.

The horizontal axis is a {@link Ext.chart.axis.Time Time Axis}
and is positioned on the bottom edge of the Chart.
It represents the bounds of the data
contained in the "WeatherPoint" Model's "date" field.
The {@link Ext.chart.axis.Time#cfg-dateFormat dateFormat}
configuration tells the Time Axis how to format its labels.

Here's what the Chart looks like now that it has its Axes configured:

{@img Ext.chart.Chart1.png Chart Axes}

### 4. Configuring the Series

The final step in creating a simple Chart
is to configure one or more {@link Ext.chart.series.Series Series}.
Series are responsible for the visual representation
of the data points contained in the Store.
This example only has one Series;
the "..." strings here are the content described above:

    Ext.create('Ext.chart.Chart', {
        ...
        axes: [
            ...
        ],
        series: [
            {
                type: 'line',
                xField: 'date',
                yField: 'temperature'
            }
        ]
    });

This Series is a {@link Ext.chart.series.Line Line Series},
and it uses the "date" and "temperature" fields
from the "WeatherPoint" Models in the Store to plot its data points
on the axes defined above:

{@img Ext.chart.Chart2.png Line Series}

See the [Line Charts Example](#!/example/charts/Line.html) for a live demo
of a more complex line chart
that includes multiple line Series and animations.

## Themes

A {@link Ext.chart.Chart#theme theme} can be defined for a chart
to control the style and formatting of the chart.
The same effects can be achieved with style configurations
for the various components
but a theme combines a set of style elements
into a package that can be applied to other charts.
You can define a full theme that includes many styling elements
and then include the name of that style for the chart.
More often, the {@link Ext.chart.Chart#cfg-theme theme} configuration option
is used to easily change the color of the chart; for example`:

    Ext.create('Ext.chart.Chart', {
        ...
        theme: 'Green',
        ...
    });

{@img Ext.chart.Chart3.png Green Theme}

## Coding an Ext JS Chart

The basic structure of an Ext JS Chart is:

    var chart = Ext.create('Ext.chart.Chart', {
        // Definitions for the Chart, including the data Store

        axes: [{
            // Definitions for the first Axis
        }, {
            // Definitions for the second Axis (if any)
           }
        }],

        series: [{
            // Definitions for the first Series
        }]
        series: [{
            // Definitions for the second Series (if any)
        }]
        series: [{
            // Definitions for additional Series (if any)
        }]
    });

## Creating and defining the Model and Store (data)

Charts use the standard Model and Store data architecture
used for the rest of the application.
This is discussed in the [Data Guide](#!/guide/data).

Some of the sample charts define date inline;
while this is not how one typically writes ones application,
it provides a useful reference.  For example, see the
[Custom Area Chart](/Users/meg/SDK/extjs/docs/guides/charting_new).

## Creating and defining the Chart

    Ext.onReady(function   ()  {
       var chart = Ext.create('Ext.chart.Chart', {
           renderTo: Ext.getBody(),
           width: 800,
           height: 600,
           animate: true,
           store: store,
           legend: {
               position: 'bottom'
           },
        }
     }

This is a basic, minimal definition of a chart --
it defines the width and height of the chart (in pixels),
and binds to the Store that is used for the data
used in the chart.

The `Ext.onReady(function ()` class
should always be called before rendering the Chart.
The `function` callback is called when the DOM is ready
and all required classes have been loaded,
so this prevents problems that can occur
when the code attempts to render a Chart
before everything is in place.

`Ext.require` statements are often included
before the `Ext.onReady` call;
for example:

    Ext.require('Ext.chart.*');
    Ext.require([
        'Ext.Window',
        'Ext.fx.target.Sprite',
        'Ext.layout.container.Fit',
        'Ext.window.MessageBox'
    ]);

This ensures that the classes required for the chart
are rendered before the chart itself is rendered.

The `renderTo: Ext.getBody()` line
is described on the
[Ext.AbstractComponent](http://docs.sencha.com/ext-js/4-2/#!/api/Ext.AbstractComponent)
page.
It specifies the element to which the chart will be rendered.

## Creating and defining the Axes

The Axes form the basic structure of the Chart.
Most commonly, this is the Cartesian (x,y) axes scheme,
with numerical values represented on the y (vertical) axis
and either numerical or categorical information
represented on the x (horizontal axis).
Cartesian axes are used for line, bar, area, and column charts.

Pie, radar, and scatter charts use polar (or radial) axes.
For a simplified view, think of polar axes in terms of a virtual circle;
the radius of the circle is the x axis
and the curved arc forming the outside of the circle
(or some portion thereof) is the y axis.

A gauge axis is a one-dimensional axis
that is used for a gauge chart,
which reports a single set of values.

{@link Ext.chart.axis.Axis} is the main Axis class.
The Ext JS Charting classes identify four types of axes:

- **Category** -- axis that plots
non-numerical categories of information.
See {@link Ext.chart.axis.Category}.
- **Numerical** -- axis that plots numerical values.
See {@link Ext.chart.axis.Numeric}.
- **Time** -- a subclass of Numerical Axes,
that plots consistent and equal time intervals.
This is a pure linear Numeric axis
with a custom rendering of the values
as human-readable dates.
See {@link Ext.chart.axis.Time}.
- **Gauge** -- a one-dimensional axis for gauge charts
that display a single set of values.
See {@link Ext.chart.axis.Gauge}.

Note that many charts that plot some set of values against date/time information
use Category axes rather than Time axes
because they do not have consistent time intervals.
This happens most commonly in charts that report financial activity,
such as hourly stock values.
Because markets close at night and for weekends and holidays,
the time intervals are inconsistent
and a Numeric line chart (for example)
would have inappropriate flat segments
for times when markets are closed.

The basic config for a Chart using Cartesian axes is:

    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['data1', 'data2', 'data3'],
        title: 'Number of Hits',
        minimum: 0,
        adjustMinimumByMajorUnit: 0
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: 'Month of the Year',
        grid: true,
        label: {
            rotate: {
                degrees: 315
            }
        }
    }],

The defines the left (y) axis to be a Numeric axis
with the fields `"data1"`, `"data2"`, and `"data3"` displayed;
these should be fields defined in the Model for the graph.
`minimum: 0` makes the y axis start counting at 0
no matter what the minimum value of the fields is;
this is what one normally expects to see on a graph.

The `adjustMinimumByMajorUnit` config is set to true,
so the minimum value is extended
beyond the data's maximum to the nearest `majorUnit`.

The bottom (x) axis is defined as a Category axis.
The title of the axis is "Month of the Year",
which is displayed in a label that is rotated 315 degrees
as in the [Area Chart](http://docs.sencha.com/ext-js/4-2/#!/example/charts/Area.html) example.
This provides a visually attractive way to fit
long labels on a chart.

The bottom (x) axis is defined as a Category axis.
The title of the axis is "Month of the Year",
which is displayed in a label that is rotated 315 degrees,
so that the longer month titles are angled
so that they fit in a smaller horizontal space.

To [do what?], add a grid config similar to the following:

    grid: {
        odd: {
            opacity: 1,
            fill: '#ddd',
            stroke: '#bbb',
            'stroke-width': 1
        }
    },

### Creating and defining the Series

Series are the central element of a chart --
the line, bars, pie image, and so forth.
One chart can contain multiple Series
that can be the same or different types of Series.
The Charting API supports the following types of Series:

- {@link Ext.chart.series.Series} -- abstract class for logic common to all chart series
- {@link Ext.chart.series.Area} -- creates a Stacked Area Chart
- {@link Ext.chart.series.Bar} -- creates a Bar Chart
- {@link Ext.chart.series.Cartesian} -- base class for series implementations
that plot values using x/y coordinates
(ref page lacks content)
- {@link Ext.chart.series.Column} -- creates a Column Chart
- {@link Ext.chart.series.Gauge} -- creates a Gauge Chart
- {@link Ext.chart.series.Line} -- creates a Line Chart
- {@link Ext.chart.series.Pie} -- creates a Pie Chart
- {@link Ext.chart.series.Scatter} -- creates a Scatter Chart

A simple definition of a Series looks like the following.
The `type` config defines the Series being used.

    // Add the Area Series
    series: [{
        type: 'area',
        highlight: true,
        axis: 'left',
        xField: 'name',
        yField: ['data1', 'data2', 'data3'],
        style: {
            opacity: 0.93
        }
    }]

#### Line series

[Line Chart](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/Line.html)
shows a Chart with three line Series, one of which is filled.

[Themed Line Charts](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/Charts.html)
illustrates some different stylings that can be used with Line Charts.

The [Live Updated Chart](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/LiveUpdates.html)
uses three Line Series that

The [Live Animated Chart](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/LiveAnimated.html)
is a slightly different presentation.

#### Area Series

Stacked Area Charts are Class {@link Ext.chart.series.Area}.

An example of a fairly simple Area Chart can be viewed here:

[Area Chart](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/Area.html)

Some interesting things to note:

- The `legend` position (bottom) is defined for the Chart itself;
it is then populated from the same `fields` definitions
used for the `left` axis.
- This chart is using the default color palette provided by the Chart class.
- The style for the chart is set to use #fff (white) as the background color;
the default is for it to be transparent.
Note that, when you set the CSS Theme to "Accessibility" or "Aria"
(which provides a black surface),
the background of the area chart remains white
whereas the code examples that do not set this config
have a transparent background
and pick up the dark background with the "Accessibility" or "Aria" CSS Theme.
For example, see the
[Tips Example](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/TipsChart.html)

[Custom Area Charts](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/AreaBrowserStats.html)
is a more sophisticated area chart
that uses custom gradients and an interactive legend.

#### Bar Series

A Bar Series represents the data with horizontal lines.

An example of a basic Bar Chart is
[Bar Charts](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/AreaBrowserStats.html).

The [Bar Renderer](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/BarRenderer.html)
example displays a horizontal bar series
with a bar renderer that modifies the color of each bar.

The [Stacked Bar Chart](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/StackedBar.html)
illustrates how to create a stacked bar chart.

The [Grouped Bar](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/GroupedBar.html) example
displays information for three different sets of data
represented by three different bars per month.
Clicking on an element in the legend
causes one set of bars to disappear/reappear in the graph.

<!-- {@link Ext.util.Format#numberRenderer} method in the label to ?? -->

#### Column Series

A Column Series is similar to a Bar Series
except that the columns are vertical from the x axis.
[Column Chart](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/Column.html)
shows a basic Column Chart.

[Column Custom Background](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/Column2.html)
is a Column Chart that customizes the colors used.

The [Reload Column Chart](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/ReloadChart.html)
example is a basic Column Chart that animates
when the data set is refreshed.

#### Pie Series

[Pie Chart Example](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/Pie.html)
shows a basic pie Series that uses the standard color scheme.

[Custom Pie Chart](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/PieRenderer.html)
illustrates a pie chart where the radius of the pie wedges varies.
Note also the renderer that is defined
to change the colors of the wedges.

#### Radar Series

[Radar Charts](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/Radar.html)
shows a basic Radar Series.

[Filled Radar Charts](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/RadarFill.html)
is a chart with three Radar Series, each of which is filled with a different color.

#### Scatter Charts

The [Scatter Renderer](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/ScatterRenderer.html)
example uses a renderer to dynamically change
the size and color of the items based on the data.

#### Gauge Charts

The [Gauge](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/Gauge.html) example
uses three Gauge Series.

#### Combination Charts

One chart can contain multiple Series
of the same of different `type`,
and any Container may include a chart
along with other components.

The [Mixed Charts](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/Mixed.html) example
shows a chart that uses a Line Chart and a Column Chart.

The [Rich Tips](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/TipsChart.html)
example is a Line Chart that uses a Pie Chart
to display detailed information for each month
when you mouse over the datapoint fo the month.

The [Complex Dashboard](http://docs.sencha.com/extjs/4.2.0/#!/example/charts/FormDashboard.html)
example sows a grid
that includes a Bar Chart and a Radar Chart.


### Adding Mixins

- {@link Ext.chart.Label} -- label creation for the Series
- {@link Ext.chart.Highlight} -- highlighting functionality for Series
- {@link Ext.chart.Callout} -- callout functionality for Series

#### Labels

Labels can be added to an axis or a series.
The `label` config defines the style of the label
(position, font, color, and so forth);
the actual content of the label is defined with the
`title` config.  For example:

    series: [{
        type: "line",
        title: "LineSeries",
        xField: "x",
        yField: "y",
        label: {
            field: "y",
            display: "under",
            color: "#00FF00"
            //, contrast : true
        }
    ],

- {@link Ext.chart.Label} -- label creation for the Series

#### Highlights

- {@link Ext.chart.Highlight} -- highlighting functionality for Series

#### Callouts
- {@link Ext.chart.Callout} -- callout functionality for Series

## Customizing the Chart's Theme

{@link Ext.chart.theme.Theme} provides Chart theming,
which is implemented as a callback
that is executed right after the class is created.

You can use the themeAttrs.colors property to change color of columns.

- {@link Ext.chart.Chart}

### Other Chart Elements

- {@link Ext.chart.Legend} -- defines a legend for a Series
- {@link Ext.chart.LegendItem} -- defines a legend item
- {@link Ext.chart.Mask} -- select a region of a chart,
allowing the user to perform actions such as panning and zooming on that region
- {@link Ext.chart.Navigation} -- handles panning and zooming activities
- {@link Ext.chart.Tip} -- provides tips for a Series


## Using Sencha Architect to Implement Charts

Ext JS Charts can be implemented using Sencha Architect.
The general process is:

1. Drag a baseline Chart type from the Toolbox to the Canvas.
This gives you an appropriate set of axes
with one Series,
using an internal dummy Store for the data.
1. Create a Model and Store for your data
and bind the Store to the Chart using the Store config
in the Config Panel.
1. Modify the axes and series
to point to the appropriate fields;
follow the instructions in the API documentation.
in your Store's Model.
to point to the appropriate fields on your Store's model.
1. If you want additional Series in your chart,
drag the appropriate type(s) of Series onto your Chart in the Canvas
the bind the appropriate Store to each Series
and do other necessary configs.

For styling and other advanced Chart facilities,
you must manually create object configs
following the instructions in the API reference docs.
