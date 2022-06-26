import React, {FC, useState} from "react";
import {makeStyles, createStyles} from "@mui/styles";
import {HeroHeading} from "./hero/HeroHeading";
import Parallax from "./parallax/Parallax";
import Footer from "./footer/Footer";
import {Container, Paper, PaperClassKey, Theme} from "@mui/material";
import {ClassNameMap} from "@mui/styles/withStyles/withStyles";
import {EmbeddedImage} from "../models/base";
import HeaderLink from "./header/HeaderLink";

// Work-around for React JSX xml namespaces issues and node 17 issues requiring --openssl-legacy-provider to load svgs using import/require
const eurekaLogoWhite = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6b3NiPSJodHRwOi8vd3d3Lm9wZW5zd2F0Y2hib29rLm9yZy91cmkvMjAwOS9vc2IiCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICBzb2RpcG9kaTpkb2NuYW1lPSJldXJla2EtbG9nby13aGl0ZS5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMCAoNmUzZTUyNDZhMCwgMjAyMC0wNS0wNykiCiAgIGlkPSJzdmc4IgogICB2ZXJzaW9uPSIxLjEiCiAgIHZpZXdCb3g9IjAgMCAxMDcgMTYxIgogICBoZWlnaHQ9IjE2MW1tIgogICB3aWR0aD0iMTA3bW0iPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMyIj4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgb3NiOnBhaW50PSJzb2xpZCIKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDEwODQiPgogICAgICA8c3RvcAogICAgICAgICBpZD0ic3RvcDEwODIiCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6IzczODFjMDtzdG9wLW9wYWNpdHk6MTsiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBvc2I6cGFpbnQ9InNvbGlkIgogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50MTAxOCI+CiAgICAgIDxzdG9wCiAgICAgICAgIGlkPSJzdG9wMTAxNiIKICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmO3N0b3Atb3BhY2l0eToxOyIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQuMTIzOTY5LC0xMzUuOTQ2OTMpIgogICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiCiAgICAgICB5Mj0iMjA3LjQwMzcyIgogICAgICAgeDI9IjMxLjAzMTA2NyIKICAgICAgIHkxPSIyMDcuNDAzNzIiCiAgICAgICB4MT0iNC4xMDA4MzM0IgogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50MTA4NiIKICAgICAgIHhsaW5rOmhyZWY9IiNsaW5lYXJHcmFkaWVudDEwMTgiCiAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiIC8+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgIHhsaW5rOmhyZWY9IiNsaW5lYXJHcmFkaWVudDEwMTgiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQxMDg2LTUiCiAgICAgICB4MT0iNC4xMDA4MzM0IgogICAgICAgeTE9IjIwNy40MDM3MiIKICAgICAgIHgyPSIzMS4wMzEwNjciCiAgICAgICB5Mj0iMjA3LjQwMzcyIgogICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiCiAgICAgICBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAuOTA1MzU0MTEsMCwwLDAuOTA1MzU0MTEsMzguODI0MzMyLC0xNzIuNTYwMzgpIiAvPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICB4bGluazpocmVmPSIjbGluZWFyR3JhZGllbnQxMDE4IgogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50MTA4Ni02IgogICAgICAgeDE9IjQuMTAwODMzNCIKICAgICAgIHkxPSIyMDcuNDAzNzIiCiAgICAgICB4Mj0iMzEuMDMxMDY3IgogICAgICAgeTI9IjIwNy40MDM3MiIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSg3My4wNDc5NDIsLTE0My42NjcyNCkiIC8+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgIHhsaW5rOmhyZWY9IiNsaW5lYXJHcmFkaWVudDEwMTgiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQxMDg2LTEiCiAgICAgICB4MT0iNC4xMDA4MzM0IgogICAgICAgeTE9IjIwNy40MDM3MiIKICAgICAgIHgyPSIzMS4wMzEwNjciCiAgICAgICB5Mj0iMjA3LjQwMzcyIgogICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiCiAgICAgICBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAuNDc1OTU3MDEsMCwwLDAuNDc1OTU3MDEsNjAuNzkxODQyLC02LjY5NzE4ODUpIiAvPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICB4bGluazpocmVmPSIjbGluZWFyR3JhZGllbnQxMDE4IgogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50MTA4Ni0wIgogICAgICAgeDE9IjQuMTAwODMzNCIKICAgICAgIHkxPSIyMDcuNDAzNzIiCiAgICAgICB4Mj0iMzEuMDMxMDY3IgogICAgICAgeTI9IjIwNy40MDM3MiIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLjY0NDc4NzEsMCwwLDAuNjAxNzAzMzQsNDQuNTc5NDAyLDI1LjExMjUwMikiIC8+CiAgPC9kZWZzPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIyNyIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iNjciCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTAyNSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE4NTMiCiAgICAgaW5rc2NhcGU6Z3VpZGUtYmJveD0idHJ1ZSIKICAgICBzaG93Z3VpZGVzPSJ0cnVlIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTpkb2N1bWVudC1yb3RhdGlvbj0iMCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIgogICAgIGlua3NjYXBlOmN5PSI1NDQuOTg4MDkiCiAgICAgaW5rc2NhcGU6Y3g9Ii05NC40MzkzOSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjY1MjQxODciCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgaWQ9ImJhc2UiIC8+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNSI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGUgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpZD0ibGF5ZXIxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiPgogICAgPHBhdGgKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjY2NjY2MiCiAgICAgICBkPSJtIDcuMTAxMTUxLDY4Ljk2ODcxMiAtMi4yNzU3OSwtNS45NDUxNCA2LjAxODg3MSwyLjQ5NzkyIDIuNDY0NDMsLTYuMTcwMTYgMi43NzQwMiw2LjA3MDM1IDUuOTE4MDQsLTIuMjk3OTQgLTIuMTI0MTgsNS45MiA1Ljg5MzY4LDIuNDYzMTYgLTUuOTI5NzUsMi42MTM1OCAyLjI2Njg1LDYuMDAzNzUgLTUuOTQ5ODgsLTIuNDg3MzMgLTIuNjg3ODksNS45NTM3MiAtMi41NTg5MywtNS45NDA3NCAtNi4wNjU5ODEsMi4yMjg1IDIuMjMxNjUsLTUuNzI3MzEgLTUuOTcwODYsLTIuNjM1NjEgeiIKICAgICAgIHN0eWxlPSJmb250LXZhcmlhdGlvbi1zZXR0aW5nczpub3JtYWw7b3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOnVybCgjbGluZWFyR3JhZGllbnQxMDg2KTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC44OTc7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO3N0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MSIKICAgICAgIGlkPSJwYXRoMTc3IiAvPgogICAgPGcKICAgICAgIHN0eWxlPSJzdHJva2U6I2ZmZmZmZjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgaWQ9Imc4ODIiCiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNC4xMzcyMzksLTEzNS45MDk5NikiPgogICAgICA8cGF0aAogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjY2NzY2MiCiAgICAgICAgIGlkPSJwYXRoODUyIgogICAgICAgICBkPSJtIDUyLjg2NTkzNywyNDYuNTM2OTEgYyAtMS45MzA2NzQsMC41OTgzOSAtNS40MTY2ODcsNS44NDcwMyAtNS40MTY2ODcsNS44NDcwMyAwLDAgLTIuNzI3NjQxLC0xLjkwNTc2IC04LjEzMzg4Nyw0Ljc4MzUyIDAsMCAtNC41NDkyNjUsNi4zNDY4MiAtNS4zNDMyODcsMTMuOTI2NDEgLTAuOTAwNTQ5LDEyLjUyOTg0IDYuNTEwMjM5LDE1LjM1MTM0IDYuNTEwMjM5LDE1LjM1MTM0IC0xLjIyMTY0LC0xLjE4NTk0IC03LjI1ODIwMSwtNS41MDYyMiAtMy41NDI4MTYsLTE1Ljk2NzA4IDEuNzc3NDM3LC0zLjk2NjcyIDYuODE2MTk2LC04LjE1NjcxIDEwLjI4NTc1NSwtMTIuNDAxNDMgMS41MDM2MDYsLTIuMDg3NDkgMS4zMTY1NzksLTMuNjg4NDEgMC45MTA4NjEsLTQuNjQ5ODggLTAuMjgxNjUsLTAuNjY3NDUgLTAuNjY4NjkxLC0xLjAyNjc1IC0wLjY2ODY5MSwtMS4wMjY3NSAwLDAgMy40MzI0MTcsLTUuMjY2MjQgNS4zOTg1MTMsLTUuODYzMTYgeiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzczODFjMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MS42NjU7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgLz4KICAgICAgPHBhdGgKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Njc2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2MiCiAgICAgICAgIGlkPSJwYXRoODU0IgogICAgICAgICBkPSJtIDE0LjY4NTg4NSwxNjguNjQyMDggYyAyLjE1NTcyNCw1LjI0NTgxIDIuMTMzNDE4LDEwLjk2MzIxIDIxLjE1NDU2MiwyMS4wOTUxOCAtMy4yNDk2NjMsMS4yMTI2NyAtMTkuNjMyNDY3LC0zLjU1NzM5IC0xOS42MzI0NjcsLTMuNTU3MzkgMCwwIDUuNzczMjE3LDYuODg0MDQgMjAuNjQwMDgsNy4yMDg3NiAtMi43MzU2NTcsMS45NDc2OCAtNy4wNTY0NTMsMi43OTU2OSAtMTIuMjcxODY1LDMuMDIzMDcgNC4yMzA4OTQsMS42MDE1OSA4LjM4MjkyMywzLjI4MjIgMTQuOTkyMDUyLDIuNTAwNzEgLTAuMTkzNjg3LDIuNjk4MDUgLTIuOTkwNDg0LDMuMjUxMDQgLTQuNDA4Njc3LDQuNjgxMTggMi43ODI3MDIsLTAuMjEwNDEgNi4wMjkxODUsLTAuOTI5NTMgOC4zNzI5MjMsLTIuOTU2MjUgLTAuNjczNTY4LDQuMjQ5OTUgLTIuODM5NjM2LDYuMDc4NDggLTQuNDAzOTA1LDguODgzMzcgMi45NTM2NjcsLTEuNjkyNTEgNS45Mzc0MTEsLTMuMzQ4MTMgNy45NDQ1NjUsLTYuMjAxNDYgMS42MzQzMzYsMi44MzQ5NCAtMC41Mzk1MDcsNS4yOTg2MSAtMS4xOTkwMzgsNy45MDc2OSAyLjU2NTQ3OSwtMS4xNzAyNiA0LjYyNDI3NywtMy4yMjE5NCA2LjE5NTUwMywtNi4xMjE3OSAwLjA2MDQ5LDEuMjg1OTkgMC4zNDMyODQsMi4wODg3NSAtMS4wMzMyNzIsNi40OTg1OCAyLjIzNzg1OSwtMS40NDMgNi4wNjc1NjMsLTUuNjM1NjggNi4wNjc1NjMsLTUuNjM1NjggMC4xMDE2MywxLjMzODc5IC0wLjk5MDcxNyw0LjU4MzE4IC0wLjk5MDcxNyw0LjU4MzE4IDIuMTg4MDY4LC0wLjU2ODI4IDQuNDUxODgsLTEuMDI4NzMgNS40ODYwODgsLTMuMjM5NjggbCAwLjc2NjYwNiwyLjExMDk0IDIuMzMyMzc3LC0xLjUxODI3IGMgMi4wMjM2NzYsMTIuODIyNCAtMTAuODE2NzQ2LDIxLjAxMDU2IC0xMS4yNzI3MzcsMTkuODg2MTUgMCwwIDExLjU4MDUyNCwtMS41MjIxNyAxNS4zMDk4MzgsLTE2LjY2MzYgLTAuMDQzODQsNS4wMzcyNCAxLjkxNzc4Myw5LjU2NTUyIC03LjQ3ODkxNSwxNy44MzAwNiAtOC4wNDM5MDgsNS4zNTg0IC01Ljc2MjgwOCw1Ljc2NjE3IC04LjM4NjY4LDguNTI1NzggbCA1LjcxNjY0OSwtNC4zMjI0NyBjIC0xLjIxMDIzOCwzLjU5ODQ5IC0yLjExNjEyNiw3LjA4MDE1IC0yLjgyNzI3MiwxMC40ODcwNiAtMC44MzczODMsNC40NTM5MiAtMC4zMTA0NjYsMTEuMDE0MzkgLTEuNDU3ODA2LDEyLjEwMDkzIC0xLjcwOTU4MywxLjM1NDEyIC0yLjA3NDU1LDIuMDQ2NSAtMS45MjYxMDEsMy45OTM0NCAxLjEyMDU4Nyw5LjE0Njc5IDcuNzA0OTE0LDExLjAzMzUxIDEyLjIyNDM4NywxNS42NjM5NiA5LjQxMDMzNCw2LjcyMDY5IDIxLjc0MzQ5MSwxLjUyMDAzIDIwLjQxNTY3MywtMS4wMDY4OSAtMTEuMzcyMjkxLDYuMTMxNTQgLTE0LjU5NTY5OCwtMC42MDU4NiAtMTkuMDIwMDk5LC01LjQ0NjYyIC0yLjQ4NjY4NCwtMy43OTc0MyAtMy42MzYxLC03Ljk3MjQzIC00LjExNzExNSwtMTIuMzM2MTUgLTEuMjUxNjMzLC0zLjk5MjI4IC0yLjYyNjkzNSwtMy44NzQ2NCAtNC4wNDQ0NDQsLTUuMzEzMDIgLTAuMjM2NjQyLC0zLjc5NjU4IDEuMzY4OTM1LC0xMi4wMjkyIDIuODEzMDc3LC0xNi4xNTY4IDEuMzM5MDI1LC0yLjEyOTk4IDIuMTU1NDMsLTQuMTY0NzIgNC44ODczODIsLTYuNTQ4NTYgbCAzLjEwNTcxNiwtMi45MzYyNyAzLjU5MTcxOSwtMTAuMTIzODkgLTAuMTc4MjMxLDkuNTY1NzYgLTEuNjU4ODg5LDYuMTMwNTkgYyAtMC4wMTAwOCwyLjA2ODg3IC01Ljg4MjE3MSw2LjY1NDA1IC03Ljk3NDExOCw5LjEyOTQ5IDUuNjI1MDQzLC0yLjE3NDg2IDEyLjEzNjUyNiwtNi44NDE2NiAxNC4zNzg2MzcsLTE3LjQyODg3IDAuNjEzMTA5LC0yLjA2NzU4IDAuNTY1OTUzLC00LjQ5MTI1IDAuMjA1ODgzLC03LjA4MzY5IDAsMCAtMy4zNTI1MTEsLTEwLjk5MTYxIC0zLjAwNjQzNSwtMTAuODk4MjQgMi42MDc1MzksMC43MDM1MyA3LjQxMjA1Niw4LjEwNTE4IDcuODYxOTA5LDE4LjcxNTgzIGwgLTEuOTg0OTI4LDkuOTc0MDEgYyAtMS41ODM1OTksMi42MDE4MSAtMy42OTkxMjYsNC41NDU3NiAtNC43MjE5NzQsNy4xNDI4OCAtMC45Njk2MzQsMi42MzM4IC0wLjA1MzY4LDQuNjcxNjEgMC4wNzUxMiw2Ljg1MDYyIDAsMCAwLjM1NjM4NSwtNC40NDY3NyAxLjQyNTU5OCwtNy4yMzQyNCAxLjUxNTM5NiwtMi45MjUyMyA0LjExMjM4NSwtNy42OTgxOSA0LjExMjM4NSwtNy42OTgxOSAxLjU4ODQ4MiwtMi40MTM3MyAyLjkyMDMyOSwtNS44OTM4MSAzLjQ3MDQwOCwtOC42NzE0NyAwLjQ2NzA4NSwtMy4xMzM2NyAwLjc5MjUyOCwtNy4wNDI2NyAtMy4wMzcwNzEsLTE0LjMyMzU3IGwgLTcuNTY4MzE5LC05Ljc5NjkyIGMgMi43MDY0NywwLjUxMzE4IDUuMzA5OTIsMC45MTgxMSA2Ljk5NDc0OCwwLjM1NzcyIC0xLjc3Mjk3LC0xLjE4NTI3IC0zLjkxMzU0NywtMi4xNzkxIC00LjEwODU2NCwtNC4xODYxNCAyLjY2NzI3OCwwLjUxMDA1IDUuMTYzMDU1LDAuNzAwNzEgNi41NDUyNjIsLTEuMTgyNDIgLTIuMzU5OTgsLTAuNjQ0OTYgLTQuNzEzNTU0LC0wLjcwNjY3IC02LjA5OTU0MiwtMy45MTgzMSAyLjcyNDg4NCwtMC4wNjI5IDUuNzg2ODI2LDAuNTQwMjEgNy41ODM2LC0xLjM1NjQ1IC0yLjUxMTM3LC0wLjU3NTAzIC01LjI5NDg5LC0wLjYxNzkyIC02LjY4MjM0OCwtMy4zOTA1MSA0LjM1NjIzMSwtMC4zMDkwOSA3LjY4NzQ4MywtMS40ODMzIDguMzU1OTUyLC00LjkwNDk2IC0yLjI2MjAzOSwwLjgxNjY4IC00LjU3NzAyOSwxLjgxNjg4IC02LjMxMjI3MSwwLjgwNzczIDMuMzEzMTI5LC0yLjI5OTA4IDguMzIwNjYsLTMuNDQ3NzkgNy44NzA0NiwtOC4zMDE5IC0zLjM4MTcwMywyLjI4MTExIC02LjczOTU4Niw0LjEzMzExIC05LjkyMTI4NSwyLjgxMTE0IDguNTIxMzYsLTcuODYwMiA2LjEzNDAyOCwtMTEuMzA0MzMgNy4wODI2NjUsLTE1LjU1NzczIC0xLjIzNDI4Nyw0LjA4NzQ2IC0yLjcwNjA5NSw3LjU0MzExIC01LjMwMzI3LDguMDA1MjcgMi40MzI3ODgsLTUuMTU3MDMgMi41NTAxMDksLTguOTgxMTEgMS4wODczOTUsLTExLjg5NTYgMC4xNzg2NiwzLjMyMzExIC0wLjUxMTQxNiw2LjEwODk1IC0zLjY0OTk0Niw3LjM4MDU1IDAuOTEyNjA1LC0xNy45MDA4NSAtNC43MzU4NSwtMTcuMDQzMzkgLTguMDU4MDA0LC0yMi44MzY5IDIuNDU1ODcsNi4yMzgxNCA1LjcxMjY5MywxMi4zODUxNiAzLjQ3Njk3OSwxOS4xNTcwNCAtMS40NTgzNjgsMy40ODMyOSAtMi41MzIwMTksNS44NjkxOCAtNC44ODUxMjUsOC4wNTY5IDAuNjUwOTY4LC0wLjA0NTMgLTEuNjYxOTk3LDAuMDE2OCAtMS42NjE5OTcsMC4wMTY4IC0wLjEwNzE2MywxLjI0OTU3IC0xLjk5MjE0Myw2LjIyODUzIC0xLjU3NTI4Miw2LjYyNDk1IDAsMCAxLjkxNzQ2Niw0LjQ2MjQgMS41MDM0NjUsNi43Nzc2NyAtMC42MzQ5LDMuOTM0NzYgLTMuOTE2MDYsMC41OTM5NSAtMy45MTYwNiwwLjU5Mzk1IC0xLjU3NjY1NSwtMi4zMTIyOCAtMy40Nzk4NzEsLTIuMzA2MzYgLTUuMzQxMjg5LC0yLjU5NzE1IC0wLjg0ODM4OCwwLjI4NzU0IDAuODk2NzU1LDEuNTkyNjQgMC42NzI1MjYsMi4zMTkyNSBsIC0wLjU5Mjk1LDAuNzk3NzMgYyAwLjE3OTcxNiwwLjc1MjU3IDMuMTg1NDY2LDIuNjI5ODEgMy4xODU2MTUsNC4yNDM1IC0xLjIyMzU0MSwyLjY0MDk3IC01Ljk3NzQ1NiwwLjQ4NTMxIC02LjYzNDIwMiwwLjMyODcyIC0xLjc3NzU4LC0wLjkxMTkxIC00Ljg4MjkzMSwtMy4yNjIyNyAtNS42MTUwNjcsLTMuNjMzNCAtMS4xODA0MTUsLTAuNjk1OTQgLTMuNTQyMjg3LC0wLjkwMjcyIC00LjMzMDg4MiwtMC45OTM2OSAwLDAgLTIuNzkxMDk0LC00LjUwMDQyIC0yLjY2Mzg1NywtMi45MTkyNiAwLDAgMC4zMjY4OTQsMS42MzMxMSAtMC4wNjI5OSwyLjIxMjI5IC0xNC4xMDE1MjIsLTAuOTU5MzIgLTIwLjY0NDQ2NCwtOC4wMzQ3NyAtMjUuODg5MzYxLC0xNC4wODYwMSB6IgogICAgICAgICBzdHlsZT0iZmlsbDojNzM4MWMwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDoxLjY7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MTtwYWludC1vcmRlcjpub3JtYWwiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY3NjY2MiCiAgICAgICAgIGlkPSJwYXRoODU2IgogICAgICAgICBkPSJtIDY2LjYzMzY1NywyNDEuMjA2MDQgYyAwLDAgLTIuNDM5MjQ2LDEuODI0NzcgLTIuNDM4ODk0LDYuMDYxOSA3LjQ1ZS00LDguOTUyMDcgNi44NTIyOTcsMTQuODkzODIgNy4xNjI2MTcsMTQuMDczNTYgLTIuNTU2MjEsLTEuMjM0MzQgLTUuNTA0ODc2LC02Ljk0NzU0IC01LjY1NTQ0NywtMTMuMTg5MDggMC4wMTIyOSwtMy41MDIyNSAwLjkzMTcyNCwtNi45NDYzOCAwLjkzMTcyNCwtNi45NDYzOCB6IgogICAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDoxLjY7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgLz4KICAgIDwvZz4KICAgIDxwYXRoCiAgICAgICBpZD0icGF0aDE3Ny01IgogICAgICAgc3R5bGU9ImZvbnQtdmFyaWF0aW9uLXNldHRpbmdzOm5vcm1hbDtvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDEwODYtNSk7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjAuODEyMTA0O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjEiCiAgICAgICBkPSJtIDQ4Ljk4NzA0MiwxMi45NjA4NDIgLTIuMDYwNCwtNS4zODI0NTA1IDUuNDQ5MjEsMi4yNjE1IDIuMjMxMTgsLTUuNTg2MTggMi41MTE0OCw1LjQ5NTgxIDUuMzU3OTIsLTIuMDgwNDQgLTEuOTIzMTQsNS4zNTk2OTA1IDUuMzM1ODcsMi4yMzAwMyAtNS4zNjg1MiwyLjM2NjIyIDIuMDUyMjksNS40MzU1MiAtNS4zODY3NCwtMi4yNTE5MiAtMi40MzM1LDUuMzkwMjMgLTIuMzE2NzQsLTUuMzc4NDcgLTUuNDkxODUsMi4wMTc1OCAyLjAyMDQzLC01LjE4NTI1IC01LjQwNTc0LC0yLjM4NjE2IHoiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjY2NjY2NjY2NjY2NjIiAvPgogICAgPHBhdGgKICAgICAgIGlkPSJwYXRoMTc3LTkiCiAgICAgICBzdHlsZT0iZm9udC12YXJpYXRpb24tc2V0dGluZ3M6bm9ybWFsO29wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50MTA4Ni02KTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC44OTcwMDE7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO3N0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gODQuMjczMDYyLDYxLjI0ODQyMiAtMi4yNzU3OSwtNS45NDUxNSA2LjAxODg3LDIuNDk3OTIgMi40NjQ0MiwtNi4xNzAxNiAyLjc3NDAzLDYuMDcwMzUgNS45MTgwNDcsLTIuMjk3OTQgLTIuMTI0MTc3LDUuOTIwMDEgNS44OTM2NzgsMi40NjMxNiAtNS45Mjk3NDgsMi42MTM1OCAyLjI2NjgzNyw2LjAwMzc1IC01Ljk0OTg3NywtMi40ODczMyAtMi42ODc5LDUuOTUzNzIgLTIuNTU4OTMsLTUuOTQwNzQgLTYuMDY1OTcsMi4yMjg1IDIuMjMxNjUsLTUuNzI3MzEgLTUuOTcwODYsLTIuNjM1NjEgeiIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjY2NjY2MiIC8+CiAgICA8cGF0aAogICAgICAgaWQ9InBhdGgxNzctNyIKICAgICAgIHN0eWxlPSJmb250LXZhcmlhdGlvbi1zZXR0aW5nczpub3JtYWw7b3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOnVybCgjbGluZWFyR3JhZGllbnQxMDg2LTEpO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDowLjQyNjkzNDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7c3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eToxIgogICAgICAgZD0ibSA2Ni4xMzQ1MjIsOTAuODMzODYyIC0xLjA4MzE4LC0yLjgyOTYzIDIuODY0NzIsMS4xODg5IDEuMTcyOTYsLTIuOTM2NzMgMS4zMjAzMiwyLjg4OTIyIDIuODE2NzQsLTEuMDkzNzIgLTEuMDExMDMsMi44MTc2NyAyLjgwNTE0LDEuMTcyMzUgLTIuODIyMzEsMS4yNDM5NiAxLjA3ODkzLDIuODU3NTIgLTIuODMxODksLTEuMTgzODYgLTEuMjc5MzIsMi44MzM3MiAtMS4yMTc5NCwtMi44Mjc1NCAtMi44ODcxNCwxLjA2MDY3IDEuMDYyMTcsLTIuNzI1OTUgLTIuODQxODgsLTEuMjU0NDQgeiIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjY2NjY2MiIC8+CiAgICA8cGF0aAogICAgICAgaWQ9InBhdGgxNzctMzYiCiAgICAgICBzdHlsZT0iZm9udC12YXJpYXRpb24tc2V0dGluZ3M6bm9ybWFsO29wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50MTA4Ni0wKTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC41NTg3MTg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO3N0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gNTEuODE3MjEyLDE0OC40MTA5MyAtMS40Njc0LC0zLjU3NzIxIDMuODgwODgsMS41MDMgMS41ODkwNCwtMy43MTI2MSAxLjc4ODY1LDMuNjUyNTUgMy44MTU4OCwtMS4zODI2OCAtMS4zNjk2NSwzLjU2MjA5IDMuODAwMTcsMS40ODIwOSAtMy44MjM0MiwxLjU3MjYxIDEuNDYxNjMsMy42MTI0NyAtMy44MzY0LC0xLjQ5NjY0IC0xLjczMzEyLDMuNTgyMzggLTEuNjQ5OTcsLTMuNTc0NTcgLTMuOTExMjYsMS4zNDA5IDEuNDM4OTQsLTMuNDQ2MTQgLTMuODQ5OTQsLTEuNTg1ODUgeiIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjY2NjY2MiIC8+CiAgPC9nPgo8L3N2Zz4K"

const usePaperStyles: () => Partial<ClassNameMap<PaperClassKey>> = makeStyles(({
                                                                                   palette,
                                                                                   spacing
                                                                               }: Theme) => createStyles({
    root: {
        backgroundColor: palette.background.paper,
        padding: spacing(2)
    }
}));
const useStyles = makeStyles(({spacing, palette, breakpoints}: Theme) => createStyles({
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: 3
    },
    heroBg: {
        backgroundPositionY: "center"
    },
    colorBar: {
        background: "#0054A5",
        color: "#FFFFFF",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 800,
        fontSize: "18px",
        textTransform: "uppercase",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        [breakpoints.down('md')]: {
            display: "none"
        }
    },
    whiteBar: {
        background: "#FFFFFF",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 800,
        fontSize: "22px",
        textTransform: "uppercase",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        [breakpoints.down('md')]: {
            justifyContent: "space-between",
        },
    },
    brandImage: {
        cursor: "pointer",
        backgroundColor: "#0054A5",
        borderRadius: "50%",
        width: 100,
        height: 100,
        padding: 8,
        flexGrow: 0,
        margin: 10,
        [breakpoints.down('md')]: {
            width: 60,
            height: 60,
        },
    },
    half: {
        flexGrow: 1,
        width: "50%",
        [breakpoints.down('md')]: {
            display: "none"
        }
    },
    left: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "right",
    },
    right: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
    },
    menuButton: {
        padding: 10,
        marginRight: 20,
        border: 0,
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 50,
        "&>span": {
            width: 30,
            height: 3,
            backgroundColor: "#0054A5",
            display: "block",
            position: "relative"
        },
        "&>span:nth-child(2)": {
            left: 6
        },
        [breakpoints.up('md')]: {
            display: "none"
        },
    },
    mobileMenu: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "left 2s",
        width: "100%",
        position: "absolute",
        zIndex: 900,
        top: 88,

        backgroundColor: "#fff",
        "&>*": {
          borderBottom: "1px solid #eee",
        },
        [breakpoints.up('md')]: {
            display: "none"
        },
    },
}));


interface PublicLayoutProps {
    children: React.ReactNode
    heroImage: string
    heroImages?: EmbeddedImage[]
    title: string
    leadParagraph?: string | JSX.Element
    small?: boolean
    blur?: boolean
}

function leftMainMenu() {
    return <HeaderLink altColor={true} href={"/news"}>Announcements & Race Reports</HeaderLink>;
}

function rightMenuMenu() {
    return <>
        <HeaderLink altColor={true} href={"/races"}>Calendar</HeaderLink>
        <HeaderLink altColor={true} href={"/marshal-roster"}>Marshal Roster</HeaderLink>
        <HeaderLink altColor={true} href={"/results"}>Results</HeaderLink>
    </>;
}

function secondMenu(alt: boolean) {
    return <>
        <HeaderLink altColor={alt} href={"/handbook"}>Club Handbook & Policies</HeaderLink>
        <HeaderLink altColor={alt} href={"/committee"}>Committee</HeaderLink>
        <HeaderLink altColor={alt} href={"/merchandise"}>Club Merch</HeaderLink>
        <HeaderLink altColor={alt} href={"/eureka-covidsafe-plan"}>Covid Safe</HeaderLink>
        <HeaderLink altColor={alt} href={"/join"}>Join</HeaderLink>
        <HeaderLink altColor={alt} href={"/contact-us"}>Contact Us</HeaderLink>
    </>;
}

export const PublicLayout: FC<PublicLayoutProps> = ({
                                                        children,
                                                        heroImage,
                                                        heroImages,
                                                        title,
                                                        leadParagraph,
                                                        small,
                                                        blur
                                                    }) => {
    const [showMobile, setShowMobile] = useState<boolean>(false);
    const classes = useStyles();

    const paperClass = usePaperStyles();
    return <div>
        <div className={classes.colorBar}>
            {secondMenu(false)}
        </div>
        <div className={classes.whiteBar}>
            <div className={classes.half}>
                <div className={classes.left}>
                    {leftMainMenu()}
                </div>
            </div>
            <a href={"/"}><img className={classes.brandImage} height={80} src={eurekaLogoWhite} alt={"Eureka Cycling"}/></a>
            <div className={classes.half}>
                <div className={classes.right}>
                    {rightMenuMenu()}
                </div>
            </div>
            <button className={classes.menuButton} onClick={() => setShowMobile(!showMobile)}>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
            </button>
        </div>
        {showMobile && <div className={classes.mobileMenu}>
            {leftMainMenu()}
            {rightMenuMenu()}
            {secondMenu(true)}
        </div>}
        <Parallax filter small={small} responsive image={heroImages ? heroImages : heroImage}
                  className={classes.heroBg} blur={blur}>
            <HeroHeading title={title} leadParagraph={leadParagraph}/>
        </Parallax>
        <Container>
            <Paper classes={paperClass} elevation={9} style={{position: "relative", zIndex: 5}}>
                {children}
            </Paper>
        </Container>
        <Footer/>
    </div>
}
export default PublicLayout;
