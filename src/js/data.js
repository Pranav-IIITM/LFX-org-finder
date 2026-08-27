// This file will be populated by Hacktoberfest contributors.
// Using a global variable for simplicity without bundlers.

const LFX_PROJECTS = [
    // 2026 TERM 3 (Current)
    {
        id: "apicurio-mcp-2026-t3",
        org: "Apicurio Registry",
        title: "MCP Tool Validation and Compatibility Checking",
        term: "2026-Term-3",
        category: "Registry",
        skills: ["Java", "Quarkus", "JSON Schema", "React", "TypeScript"],
        mentors: ["Vandana Yadav", "Carles Arnal"],
        repo: "Apicurio/apicurio-registry",
        issueUrl: "https://github.com/Apicurio/apicurio-registry/issues/8427",
        lfxUrl: "https://mentorship.lfx.linuxfoundation.org/project/764a7403-9878-463f-a12f-9b173c3fd0a7",
        description: "Add validation and compatibility checking for MCP tools — the same schema governance Apicurio already provides for Avro, Protobuf, and JSON Schema."
    },
    {
        id: "flatcar-nebraska-2026-t3",
        org: "Flatcar Container Linux",
        title: "Nebraska Reporting & Metrics Uplift",
        term: "2026-Term-3",
        category: "Operating System",
        skills: ["SQL", "PostgreSQL", "Go", "React", "Prometheus"],
        mentors: ["Jan Bronicki", "Ervin Racz"],
        repo: "flatcar/Flatcar",
        issueUrl: "https://github.com/flatcar/Flatcar/issues/2239",
        lfxUrl: "https://mentorship.lfx.linuxfoundation.org/project/7be547a2-488d-493f-ab5b-a0ad32fa17d9",
        description: "Improve Nebraska's reporting and metrics - the dashboards and monitoring numbers operators rely on to track the fleet's OS update status."
    },
    {
        id: "hami-gpu-obs-2026-t3",
        org: "HAMi",
        title: "HAMi GPU Observability: Metrics and Dashboards",
        term: "2026-Term-3",
        category: "AI/ML",
        skills: ["Prometheus", "Grafana", "Go", "Kubernetes"],
        mentors: ["Mesut Oezdil", "Reza Jelveh", "Jimmy Song"],
        repo: "Project-HAMi/HAMi",
        issueUrl: "https://github.com/Project-HAMi/HAMi/issues/2126",
        lfxUrl: "https://mentorship.lfx.linuxfoundation.org/project/dd302799-03ec-4184-b289-4d59a41fe7ed",
        description: "Improve the usefulness, consistency, and documentation of HAMi GPU observability for operators running shared GPU workloads with Prometheus and Grafana."
    },
    {
        id: "headlamp-dra-2026-t3",
        org: "Headlamp",
        title: "Adding Dynamic Resource Allocation (DRA) to Headlamp",
        term: "2026-Term-3",
        category: "UI",
        skills: ["TypeScript", "React", "Kubernetes CRDs"],
        mentors: ["Kevin Hannon", "Heba Elayoty"],
        repo: "kubernetes-sigs/headlamp",
        issueUrl: "https://github.com/kubernetes-sigs/headlamp/issues/4831",
        lfxUrl: "https://mentorship.lfx.linuxfoundation.org/project/d5b57a08-b6b6-4818-9a66-880544d4a7e9",
        description: "Add first-class Dynamic Resource Allocation (DRA) support to Headlamp, introducing a Devices section and views for Kubernetes 1.36 DRA resources."
    },
    {
        id: "harbor-p2p-2026-t3",
        org: "Harbor",
        title: "Air-Gapped Peer-to-Peer Image Proxying in Harbor-Satellite",
        term: "2026-Term-3",
        category: "Registry",
        skills: ["Go", "OCI Spec", "ORAS"],
        mentors: ["Lakshit Singh", "Orlin Vasilev"],
        repo: "container-registry/harbor-satellite",
        issueUrl: "https://github.com/container-registry/harbor-satellite/issues/542",
        lfxUrl: "https://mentorship.lfx.linuxfoundation.org/project/65f18185-8b71-4b12-bccf-478a50896c16",
        description: "Add an opt-in peer-to-peer distribution mode for Harbor Satellite for air-gapped deployments."
    },
    
    // 2026 TERM 1 (Historic)
    {
        id: "antrea-bpf-2026-t1",
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
        id: "cilium-pillar-2026-t1",
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
        id: "etcd-self-assess-2026-t1",
        org: "etcd",
        title: "Dive deep into etcd by contributing to the self-Assessment",
        term: "2026-Term-1",
        category: "Database",
        skills: ["Golang", "Distributed Systems", "Security"],
        mentors: ["Ronald Ngounou", "Siyuan Zhang", "Carol Valencia"],
        repo: "etcd-io/etcd",
        issueUrl: "https://github.com/etcd-io/etcd/issues/21159",
        lfxUrl: "https://mentorship.lfx.linuxfoundation.org/project/90bcea22-62eb-4e81-aa0f-89b517b2a620",
        description: "Dive deep into etcd's architecture in depth by completing and publishing the self-assessment for SIG-Security review, including Raft consensus algorithm and high availability mechanisms."
    },
    {
        id: "jaeger-ai-trace-2026-t1",
        org: "Jaeger",
        title: "AI-Powered Trace Analysis with Local LLM Support",
        term: "2026-Term-1",
        category: "Observability",
        skills: ["Golang", "React", "AI/LLM", "LangChain"],
        mentors: ["Jonah Kowall", "Yuri Shkuro"],
        repo: "jaegertracing/jaeger",
        issueUrl: "https://github.com/jaegertracing/jaeger/issues/7832",
        lfxUrl: "https://mentorship.lfx.linuxfoundation.org/project/27ef67ba-24a4-4683-872e-d56bcc11d66a",
        description: "Integrate Small Language Models (SLMs) and Large Language Models (LLMs) into the Jaeger ecosystem to provide intelligent trace analysis and natural language search mapping."
    }
];
