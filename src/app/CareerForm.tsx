"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import api from "@/utils/axios";

const COMPANY_STAGES = [
  "Idea",
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Growth",
  "Established"
];

export default function CareerForm() {
  const [companyName, setCompanyName] = useState("");
  const [aboutContent, setAboutContent] = useState("");
  const [youtubeVideo, setYoutubeVideo] = useState("");
  const [industry, setIndustry] = useState("");
  const [keyPeople, setKeyPeople] = useState<string[]>([]);
  const [newKeyPerson, setNewKeyPerson] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [xLink, setXLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [companyStage, setCompanyStage] = useState("");
  const [glassdoorConnected, setGlassdoorConnected] = useState(false);
  const [ambitionBoxConnected, setAmbitionBoxConnected] = useState(false);
  const [hiringProcess, setHiringProcess] = useState("");
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [hiringSteps, setHiringSteps] = useState<{ title: string; subtext: string }[]>([]);
  const [benefits, setBenefits] = useState<{ title: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setError(null);
      try {
        const res = await api.get("/api/career");
        if (res.data) {
          setCompanyName(res.data.companyName || "");
          setAboutContent(res.data.aboutContent || "");
          setYoutubeVideo(res.data.youtubeVideo || "");
          setIndustry(res.data.industry || "");
          let kp = res.data.keyPeople;
          if (typeof kp === "string") {
            try { kp = JSON.parse(kp); } catch { kp = []; }
          };
          if (!Array.isArray(kp)) kp = [];
          setKeyPeople(kp);
          setLinkedInLink(res.data.linkedInLink || "");
          setXLink(res.data.xLink || "");
          setWebsiteLink(res.data.websiteLink || "");
          setCompanyStage(res.data.companyStage || "");
          setGlassdoorConnected(!!res.data.glassdoorConnected);
          setAmbitionBoxConnected(!!res.data.ambitionBoxConnected);
          setHiringProcess(res.data.hiringProcess || "");
          let faqs = res.data.faqs;
          if (typeof faqs === "string") { try { faqs = JSON.parse(faqs); } catch { faqs = [{ question: "", answer: "" }]; } }
          if (!Array.isArray(faqs)) faqs = [{ question: "", answer: "" }];
          setFaqs(faqs);
          let hiringSteps = res.data.hiringSteps;
          if (typeof hiringSteps === "string") { try { hiringSteps = JSON.parse(hiringSteps); } catch { hiringSteps = [{ title: "", subtext: "" }]; } }
          if (!Array.isArray(hiringSteps)) hiringSteps = [{ title: "", subtext: "" }];
          setHiringSteps(hiringSteps);
          let benefits = res.data.benefits;
          if (typeof benefits === "string") { try { benefits = JSON.parse(benefits); } catch { benefits = [{ title: "" }]; } }
          if (!Array.isArray(benefits)) benefits = [{ title: "" }];
          setBenefits(benefits);
        };
      } catch (err) {
        if (typeof err === "object" && err && "response" in err) {
          setError((err as { response?: { data?: { error?: string } } })?.response?.data?.error || "Failed to fetch data");
        } else {
          setError("Failed to fetch data");
        };
      };
    })();
  }, []);

  const handleMakeChangesLive = async () => {
    setError(null);
    try {
      await api.post("/api/career", {
        companyName,
        aboutContent,
        youtubeVideo,
        industry,
        keyPeople,
        linkedInLink,
        xLink,
        websiteLink,
        companyStage,
        glassdoorConnected,
        ambitionBoxConnected,
        hiringProcess,
        faqs,
        hiringSteps,
        benefits
      });
    } catch (error) {
      if (typeof error === "object" && error && "response" in error) {
        setError((error as { response?: { data?: { error?: string } } })?.response?.data?.error || "Failed to save data");
      } else {
        setError("Failed to save data");
      };
    };
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-12">
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-2 gap-12 justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg font-medium text-[#3b362c]">
            Customise your Careers page
          </h1>
          <h3 className="text-base text-[#645e54]">This page is used to customise your careers page</h3>
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-foreground font-semibold">Company Name</h4>
              <Input
                type="text"
                placeholder="Enter the name of your company"
                className="w-full"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-foreground font-semibold">About Content</h4>
              <Textarea
                placeholder="Enter a brief description about your company"
                className="w-full h-[5rem] resize-none"
                value={aboutContent}
                onChange={e => setAboutContent(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-foreground font-semibold">YouTube Video</h4>
              <Input
                type="text"
                placeholder="https://www.youtube.com/watch?"
                className="w-full"
                value={youtubeVideo}
                onChange={e => setYoutubeVideo(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-foreground font-semibold">Industry Operated In</h4>
              <Input
                type="text"
                placeholder="Human Resources, Technology, etc."
                className="w-full"
                value={industry}
                onChange={e => setIndustry(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-foreground font-semibold">Key People</h4>
              <div className="flex flex-col gap-1">
                {keyPeople.map((person, idx) => (
                  <Input
                    key={idx}
                    type="text"
                    className="w-full"
                    value={person}
                    placeholder={`Key Person #${idx + 1}`}
                    onChange={e => {
                      const updated = [...keyPeople];
                      updated[idx] = e.target.value;
                      setKeyPeople(updated);
                    }}
                  />
                ))}
                <div className="flex flex-row gap-2 w-full justify-between">
                  <Input
                    type="text"
                    className="w-full"
                    placeholder="Add new key person"
                    value={newKeyPerson}
                    onChange={e => setNewKeyPerson(e.target.value)}
                  />
                  <Button
                    variant={"secondary"}
                    className="rounded-sm"
                    onClick={() => {
                      if (newKeyPerson && newKeyPerson.trim() !== "") {
                        setKeyPeople([...keyPeople, newKeyPerson]);
                        setNewKeyPerson("");
                      }
                    }}
                  >
                    <Plus fontSize={"1rem"} className="stroke-[0.22rem]" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-foreground font-semibold">Social Media Links</h4>
              <div className="flex flex-col gap-1">
                <Input
                  type="text"
                  placeholder="https://www.linkedin.com/company/"
                  className="w-full"
                  value={linkedInLink}
                  onChange={e => setLinkedInLink(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="https://x.com/"
                  className="w-full"
                  value={xLink}
                  onChange={e => setXLink(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="https://mycompany.com/"
                  className="w-full"
                  value={websiteLink}
                  onChange={e => setWebsiteLink(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-foreground font-semibold">Company Stage</h4>
              <Select value={companyStage} onValueChange={setCompanyStage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_STAGES.map(stage => (
                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2 w-full">
                <h4 className="text-sm text-foreground font-semibold">Glassdoor</h4>
                <Button
                  variant={glassdoorConnected ? "secondary" : "default"}
                  onClick={() => setGlassdoorConnected(v => !v)}
                  className="w-full"
                >
                  {glassdoorConnected ? "Disconnect" : "Connect"}
                </Button>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <h4 className="text-sm text-foreground font-semibold">AmbitionBox</h4>
                <Button
                  variant={ambitionBoxConnected ? "secondary" : "default"}
                  onClick={() => setAmbitionBoxConnected(v => !v)}
                  className="w-full"
                >
                  {ambitionBoxConnected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-foreground font-semibold">Hiring Process</h4>
              <Input
                type="text"
                placeholder="Human Resources"
                className="w-full"
                value={hiringProcess}
                onChange={e => setHiringProcess(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <Button
            className="w-fit self-end px-10 rounded-md"
            onClick={handleMakeChangesLive}
          >
            Make Changes Live
          </Button>
          <div className="flex flex-col gap-6 mt-6">
            {/* FAQ Section */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-foreground font-semibold">FAQ</h4>
              <Card className="p-2 gap-3">
                {faqs.map((faq, idx) => (
                  <Card key={idx} className="bg-[#f9f9f9] p-2 gap-2">
                    <div className="flex justify-between items-center relative">
                      <input
                        type="text"
                        placeholder="Add a question"
                        className="border-none bg-transparent w-full focus:outline-none text-sm text-foreground pl-1 pr-10"
                        value={faq.question}
                        onChange={e => {
                          const updated = [...faqs];
                          updated[idx].question = e.target.value;
                          setFaqs(updated);
                        }}
                      />
                      <Button
                        variant="link"
                        className="absolute right-[-0.5rem] top-1/2 -translate-y-1/2 p-0"
                        onClick={() => setFaqs(faqs => faqs.filter((_, i) => i !== idx))}
                      >
                        <Minus className="stroke-[0.22rem]" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Add an answer"
                      className="w-full h-[7rem] resize-none bg-white border-gray-100"
                      value={faq.answer}
                      onChange={e => {
                        const updated = [...faqs];
                        updated[idx].answer = e.target.value;
                        setFaqs(updated);
                      }}
                    />
                  </Card>
                ))}
                <Button
                  className="w-fit self-center !px-8"
                  variant={"secondary"}
                  onClick={() => setFaqs(faqs => [...faqs, { question: "", answer: "" }])}
                >
                  <Plus fontSize="0.5rem" />
                  Add Question
                </Button>
              </Card>
            </div>
            {/* Hiring Process Section */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-foreground font-semibold">Hiring Process</h4>
              <Card className="p-2 gap-3">
                {hiringSteps.map((step, idx) => (
                  <Card key={idx} className="bg-[#f9f9f9] p-2 gap-2">
                    <div className="flex justify-between items-center relative">
                      <input
                        type="text"
                        placeholder="Add a Title"
                        className="border-none bg-transparent w-full focus:outline-none text-sm text-foreground pl-1 pr-10"
                        value={step.title}
                        onChange={e => {
                          const updated = [...hiringSteps];
                          updated[idx].title = e.target.value;
                          setHiringSteps(updated);
                        }}
                      />
                      <Button
                        variant="link"
                        className="absolute right-[-0.5rem] top-1/2 -translate-y-1/2 p-0"
                        onClick={() => setHiringSteps(steps => steps.filter((_, i) => i !== idx))}
                      >
                        <Minus className="stroke-[0.22rem]" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Add a Subtext"
                      className="w-full h-[7rem] resize-none bg-white border-gray-100"
                      value={step.subtext}
                      onChange={e => {
                        const updated = [...hiringSteps];
                        updated[idx].subtext = e.target.value;
                        setHiringSteps(updated);
                      }}
                    />
                  </Card>
                ))}
                <Button
                  className="w-fit self-center !px-8"
                  variant={"secondary"}
                  onClick={() => setHiringSteps(steps => [...steps, { title: "", subtext: "" }])}
                >
                  <Plus fontSize="0.5rem" />
                  Add Step
                </Button>
              </Card>
            </div>
            {/* Benefits Section */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-foreground font-semibold">Benefits</h4>
              <Card className="p-2 gap-3">
                {benefits.map((benefit, idx) => (
                  <Card key={idx} className="bg-[#f9f9f9] p-2 gap-2">
                    <div className="flex justify-between items-center relative">
                      <input
                        type="text"
                        placeholder="Add a Title"
                        className="border-none bg-transparent w-full focus:outline-none text-sm text-foreground pl-1 pr-10"
                        value={benefit.title}
                        onChange={e => {
                          const updated = [...benefits];
                          updated[idx].title = e.target.value;
                          setBenefits(updated);
                        }}
                      />
                      <Button
                        variant="link"
                        className="absolute right-[-0.5rem] top-1/2 -translate-y-1/2 p-0"
                        onClick={() => setBenefits(benefits => benefits.filter((_, i) => i !== idx))}
                      >
                        <Minus className="stroke-[0.22rem]" />
                      </Button>
                    </div>
                  </Card>
                ))}
                <Button
                  className="w-fit self-center !px-8"
                  variant={"secondary"}
                  onClick={() => setBenefits(benefits => [...benefits, { title: "" }])}
                >
                  <Plus fontSize="0.5rem" />
                  Add Benefit
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
