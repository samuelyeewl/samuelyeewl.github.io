---
layout: page
title: stories
permalink: /stories/
description: photo essays
---

{% assign stories = site.stories | sort:"pubdate" | reverse %}

{% for story in stories %}
{% assign story_path = story.imgdir | prepend: "stories/" | append: "/" %}
<div class="story-link">
    <a href="{{ story.url | prepend: site.baseurl | prepend: site.url }}">
    <img src="{{ story.cover | prepend: story_path | prepend: 'v1/' | prepend: 'w_850,c_limit/' | prepend: site.asset_path | append: '.jpg' }}" />
    <div class="overlay">
    <div class="story-info">
        <h1 class="story-title">{{ story.title }}</h1>
        {% if story.description %}
        <p class="story-desc">{{ story.description }}</p>
        {% endif %}
        <p class="story-date">
            {% if story.startdate and story.enddate %}
                {% assign startyear = story.startdate | date: "%Y" %}
                {% assign endyear = story.enddate | date: "%Y" %}
                {% assign startmonth = story.startdate | date: "%B" %}
                {% assign endmonth = story.enddate | date: "%B" %}
                {% assign startday = story.startdate | date: "%-d" %}
                {% case startday %}
                    {% when '1' or '21' or '31' %}{% assign startday = startday | append: 'st' %}
                    {% when '2' or '22' %}{% assign startday = startday | append: 'nd' %}
                    {% when '3' or '23' %}{% assign startday = startday | append: 'rd' %}
                    {% else %}{{ day }}{% assign startday = startday | append: 'th' %}
                {% endcase %}
                {% assign endday = story.enddate | date: "%-d" %}
                {% case endday %}
                    {% when '1' or '21' or '31' %}{% assign endday = endday | append: 'st' %}
                    {% when '2' or '22' %}{% assign endday = endday | append: 'nd' %}
                    {% when '3' or '23' %}{% assign endday = endday | append: 'rd' %}
                    {% else %}{{ day }}{% assign endday = endday | append: 'th' %}
                {% endcase %}
                {% if startyear == endyear %}
                    {% if startmonth == endmonth %}
                        {% if startday == endday %}
                            {{ startmonth }}
                            {{ startday }},
                            {{ startyear }}
                        {% else %}
                            {{ startmonth }}
                            {{ startday }} - {{ endday }},
                            {{ startyear }}
                        {% endif %}
                    {% else %}
                        {{ startmonth }} {{ startday }} - {{ endmonth }} {{ endday }},
                        {{ startyear }}
                    {% endif %}
                {% else %}
                    {{ startmonth }} {{ startday }}, {{ startyear }} - {{ endmonth }} {{ endday }}, {{ endyear }}
                {% endif %}
            {% elsif story.date %}
                {{ story.date | date: "%B" }}
                {% assign day = story.date | date: "%-d"  %}
                {% case day %}
                  {% when '1' or '21' or '31' %}{{ day }}st,
                  {% when '2' or '22' %}{{ day }}nd,
                  {% when '3' or '23' %}{{ day }}rd,
                  {% else %}{{ day }}th,
                {% endcase %}
                {{ story.date | date: "%Y" }}
            {% endif %}
            <br>
            Published 
            {{ story.pubdate | date: "%B" }}
            {% assign day = story.pubdate | date: "%-d"  %}
            {% case day %}
              {% when '1' or '21' or '31' %}{{ day }}st,
              {% when '2' or '22' %}{{ day }}nd,
              {% when '3' or '23' %}{{ day }}rd,
              {% else %}{{ day }}th,
            {% endcase %}
            {{ story.pubdate | date: "%Y" }}
        </p>
        <p class="story-date">
            
        </p>
    </div>
    </div>
    </a>
</div>

{% endfor %}
