// This file will be populated by Hacktoberfest contributors.
// Using a global variable for simplicity without bundlers.

const LFX_PROJECTS = [
    {
        id: "antrea-bpf-2026",
        org: "Antrea",
        title: "Compare Antrea BPF generation for PacketCapture to tcpdump / libpcap",
        term: "2026-Term-1",
        category: "Networking",
        skills: ["Golang", "BPF", "tcpdump"],
        mentors: ["Antonin Bas", "Hang Yan"],
        repo: "antrea-io/antrea",
        issueUrl: "https://github.com/antrea-io/antrea/issues/7701",
        lfxUrl: "https://mentorship.lfx.linuxfoundation.org/project/39be2843-94f8-4ac6-aa0a-3537631aca86",
        description: "Antrea's PacketCapture feature includes custom BPF code generation. The goal is to compare our generated BPF with the tcpdump reference, analyze differences, and update our BPF generation to match tcpdump."
    },
    {
        id: "cilium-pillar-2026",
        org: "Cilium",
        title: "Cilium Project Pillar Pages",
        term: "2026-Term-1",
        category: "Networking",
        skills: ["Markdown", "Figma", "Writing"],
        mentors: ["Bill Mulligan"],
        repo: "cilium/cilium.io",
        issueUrl: "https://github.com/cilium/cilium.io/issues/841",
        lfxUrl: "https://mentorship.lfx.linuxfoundation.org/project/854310e3-e1ac-472c-945f-97bb16bc1aca",
        description: "cilium.io could benefit from SEO pillar pages that capture higher level problems that people will search for. These pages will capture high-intent search traffic and guide users."
    },
    {
        id: "drasi-iot-2026",
        org: "Drasi",
        title: "Drasi for IoT: MQTT Integration and Real-Time Sensor Monitoring",
        term: "2026-Term-1",
        category: "IoT / Edge",
        skills: ["Rust", "MQTT", "IoT"],
        mentors: ["Aman Singh", "Allen Jones"],
        repo: "drasi-project/drasi-core",
        issueUrl: "https://github.com/drasi-project/drasi-core/issues/155",
        lfxUrl: "https://mentorship.lfx.linuxfoundation.org/project/febb9f7b-8516-41b5-8815-770d333ac978",
        description: "Drasi is a Data Change Processing platform. In this project, the mentee will build a suite of lightweight Rust crates that enable Drasi Lib to communicate with MQTT brokers."
    },
    {
        id: "harbor-cli-2026",
        org: "Harbor",
        title: "Harbor CLI Improvements",
        term: "2026-Term-1",
        category: "Registry",
        skills: ["Golang", "Cobra"],
        mentors: ["Vadim Bauer", "Orlin Vasilev"],
        repo: "goharbor/harbor-cli",
        issueUrl: "https://github.com/goharbor/harbor-cli/issues",
        lfxUrl: "https://mentorship.lfx.linuxfoundation.org/project/89a4b97d-77c7-4b57-907b-6bc746389b87",
        description: "Harbor CLI is the official command-line interface for Harbor. This project focuses on improving CLI UX by porting complex commands like job service dashboard and audit logs."
    }
];
